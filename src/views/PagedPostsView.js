import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import Pager from 'components/Pager'
import PostsList from 'components/PostsList'
import { postLoadPage } from 'redux/modules/posts'
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PagedPostsView extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    nbPages: PropTypes.number.isRequired,
    postLoadPage: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
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
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
        <PostsList posts={this.props.posts} />
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const page = _get(ownProps.params, 'currentPage', 1) * 1
  const posts = _get(state.posts.byPage, page, []).map((slug) => state.posts.bySlug[slug])
  const loaded = state.posts.loadedPages.indexOf(page) !== -1
  const loading = state.posts.loadingPages.indexOf(page) !== -1
  return {
    nbPages: state.posts.nbPages,
    currentPage: page,
    posts,
    loaded,
    loading
  }
}

export default connect((mapStateToProps), { postLoadPage })(PagedPostsView)
