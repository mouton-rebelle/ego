import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import Pager from 'components/Pager'
import ImageOverlay from 'components/ImageOverlay'
import PostsList from 'components/PostsList'
import { postLoadPage } from 'redux/modules/posts'
import { actions } from 'redux/modules/images'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PagedPostsView extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    nbPages: PropTypes.number.isRequired,
    postLoadPage: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    showOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    overlayShown: PropTypes.bool.isRequired,
    overlayImage: PropTypes.object
  };

  componentWillMount () {
    this.loadPostsIfNeeded(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.loadPostsIfNeeded(nextProps)
  }

  loadPostsIfNeeded (props) {
    if (!props.loaded && !props.loading) {
      props.postLoadPage(props.currentPage)
    }
  }

  render () {
    return (
      <div className='container'>
        <ImageOverlay image={this.props.overlayImage} shown={this.props.overlayShown} close={this.props.closeOverlay}/>
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
        <PostsList posts={this.props.posts} showOverlay={this.props.showOverlay} />
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const page = _get(ownProps.params, 'curentPage', 1) * 1
  const posts = _get(state.posts.byPage, page, []).map((slug) => state.posts.bySlug[slug])
  const loaded = state.posts.loadedPages.indexOf(page) !== -1
  const loading = state.posts.loadingPages.indexOf(page) !== -1
  const overlayShown = state.images.overlay.shown
  const overlayImage = state.images.overlay.image
  return {
    nbPages: state.posts.nbPages,
    currentPage: page,
    posts,
    loaded,
    loading,
    overlayShown,
    overlayImage
  }
}

export default connect((mapStateToProps), {postLoadPage, ...actions})(PagedPostsView)
