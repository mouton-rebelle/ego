import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import { postLoadPage } from 'redux/modules/posts'
// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import PagedPosts from 'views/PagedPosts'

const About = React.createClass({
  render () {
    return <h3>About <Link to='/page/2'>page 2</Link></h3>
  }
})

export default (store) => {
  const onEnterPage = (nextState, transition) => {
    store.dispatch(postLoadPage(nextState.params.currentPage*1 || 1))
  }
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={PagedPosts} onEnter={onEnterPage} />
      <Route path='page/:currentPage' component={PagedPosts} onEnter={onEnterPage}/>
      <Route path='/about' component={About}/>
    </Route>
  )
}

// <Route path='/post/:id(/:imageId)' component={SinglePostPage}/>

// <Route path='/search' component={Search}/>
