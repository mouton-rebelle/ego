import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import { postLoadBySlug } from 'redux/modules/posts'
import Post from 'components/Post'
import PostDetail from 'components/PostDetail'

class SinglePostView extends Component {

  static propTypes={
    post: PropTypes.object,
    postLoadBySlug: PropTypes.func.isRequired,
    imageId: PropTypes.string,
    slug: PropTypes.string.isRequired
  };

  componentWillMount () {
    if (!this.props.post) {
      this.props.postLoadBySlug(this.props.slug)
    }
  }

  render () {
    if (!this.props.post) {
      return (<div>loading</div>)
    }

    if (this.props.imageId) {
      return (
        this.props.post ? (<PostDetail
          child={this.props.post.child}
          desc={this.props.post.desc}
          slug={this.props.post.slug}
          imageId={this.props.imageId}
          title={this.props.post.title}
          />) : null
      )
    } else {
      return (
        this.props.post ? (<Post
          post={this.props.post}
          />) : null
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = _get(state.posts.bySlug, ownProps.params.slug)
  const imageId = _get(ownProps.params, 'imageId')
  return { post, imageId, slug: ownProps.params.slug }
}

export default connect((mapStateToProps), { postLoadBySlug })(SinglePostView)
