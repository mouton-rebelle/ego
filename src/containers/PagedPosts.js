import React, {PropTypes, Component} from 'react'
import {get as _get} from 'lodash'

export default class PagedPosts extends Component {

  static propTypes={
    dispatch: PropTypes.func.isRequired,
    nbPages: PropTypes.number.isRequired,
    params: PropTypes.object,
    postIdsPerPage: PropTypes.object,
    postsById: PropTypes.object
  };

  render () {
    // const { params, postIdsPerPage, postsById, nbPages } = this.props
    // const currentPage = params.currentPage ? 1 * params.currentPage : 1
    // let posts = []
    // _get(postIdsPerPage, currentPage, []).forEach((id) => {
    //   posts.push(postsById[id])
    // })
    console.log('render')
    return (
      <div>
        ego front router
      </div>
    )
  }
}

// <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
// <PostsList posts={posts}/>
// <Pager basePath={"/page/"} currentPage={currentPage} nbPages={nbPages}/>
