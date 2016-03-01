import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'
import Pager from 'components/Pager'
import PostsList from 'components/PostsList'
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PagedPosts extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    nbPages: PropTypes.number.isRequired,
    postIdsPerPage: PropTypes.object.isRequired,
    postsById: PropTypes.object.isRequired
  };

  render () {
    let posts = []
    _get(this.props.postIdsPerPage, this.props.currentPage, []).forEach((id) => {
      posts.push(this.props.postsById[id])
    })
    return (
      <div className='container text-center'>
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
        <PostsList posts={posts} />
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  nbPages: state.posts.nbPages,
  currentPage: state.posts.currentPage,
  postIdsPerPage: state.posts.byPage,
  postsById: state.posts.byId
})
export default connect((mapStateToProps), {
})(PagedPosts)
