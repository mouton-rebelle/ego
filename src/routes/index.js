import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import PagedPostsView from 'views/PagedPostsView'
import SinglePostView from 'views/SinglePostView'

const About = React.createClass({
  render () {
    return <h3>About <Link to='/page/2'>page 2</Link></h3>
  }
})

export default (store) => {
  // here I can add an onEnter method to check for auth on admin routes
  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={PagedPostsView} />
      <Route path='/page/:currentPage' component={PagedPostsView}/>
      <Route path='/post/:postId(/:imageId)' component={SinglePostView}/>
      <Route path='/about' component={About}/>
    </Route>
  )
}
