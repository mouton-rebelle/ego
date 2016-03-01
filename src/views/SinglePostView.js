import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import { postLoadById } from 'redux/modules/posts'
import Post from 'components/Post'
import PostDetail from 'components/PostDetail'

class SinglePostView extends Component {

  static propTypes={
    post: PropTypes.object,
    postLoadById: PropTypes.func.isRequired,
    imageId: PropTypes.string,
    id: PropTypes.string.isRequired
  };

  componentWillMount () {
    if (!this.props.post) {
      this.props.postLoadById(this.props.id)
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
          id={this.props.post._id}
          imageId={this.props.imageId}
          title={this.props.post.title}
          />) : null
      )
    } else {
      return (
        this.props.post ? (<Post
          id={this.props.post._id}
          key={this.props.post._id}
          post={this.props.post}
          />) : null
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = _get(state.posts.byId, ownProps.params.postId)
  const imageId = _get(ownProps.params, 'imageId')
  return { post, imageId, id: ownProps.params.postId }
}

export default connect((mapStateToProps), { postLoadById })(SinglePostView)
