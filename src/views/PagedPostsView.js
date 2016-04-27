import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import Pager from 'components/Pager'
import ImageOverlay from 'components/ImageOverlay'
import PostsList from 'components/PostsList'
import { postLoadPage } from 'redux/modules/posts'
import { actions } from 'redux/modules/images'

export class PagedPostsView extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    nbPages: PropTypes.number.isRequired,
    postLoadPage: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    prepareOverlay: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    overlayHasHUD: PropTypes.bool.isRequired,
    toggleHud: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    overlayShown: PropTypes.bool.isRequired,
    overlayImage: PropTypes.object,
    overlayPost: PropTypes.object,
    overlayPrev: PropTypes.object,
    overlayNext: PropTypes.object
  };

  constructor (props) {
    super(props)
    this.onKeyDown = (evt) => {
      if (this.props.overlayShown === false) {
        return
      }
      evt.preventDefault()
      switch (evt.keyCode) {
        case 32: // [space]
          this.props.toggleHud()
          break
        case 37: // <-
          this.props.prepareOverlay(this.props.overlayPrev)
          break
        case 39: // ->
          this.props.prepareOverlay(this.props.overlayNext)
          break
        case 27: // echap
          this.props.closeOverlay()
          break
      }
    }
  }

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
  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    return (
      <div className='container'>
        <ImageOverlay
          image={this.props.overlayImage}
          post={this.props.overlayPost}
          shown={this.props.overlayShown}
          close={this.props.closeOverlay}
          toggleHud={this.props.toggleHud}
          hud={this.props.overlayHasHUD}/>
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
        <PostsList posts={this.props.posts} showOverlay={this.props.prepareOverlay} />
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
  const overlayShown = state.images.overlay.shown
  const overlayImage = state.images.overlay.image
  const overlayPost = state.images.overlay.post
  const overlayNext = state.images.overlay.next
  const overlayPrev = state.images.overlay.prev
  const overlayHasHUD = state.images.overlay.hud
  return {
    nbPages: state.posts.nbPages,
    currentPage: page,
    posts,
    loaded,
    loading,
    overlayHasHUD,
    overlayShown,
    overlayImage,
    overlayPost,
    overlayPrev,
    overlayNext
  }
}

export default connect((mapStateToProps), {postLoadPage, ...actions})(PagedPostsView)
