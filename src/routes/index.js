import React from 'react'
import { Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import PagedPosts from 'containers/PagedPosts'

const About = React.createClass({
  render () {
    return <h3>About</h3>
  }
})

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={About} />
    <Route path='page/:currentPage' component={PagedPosts}/>
  </Route>
)

// <Route path='/post/:id(/:imageId)' component={SinglePostPage}/>
// <Route path='/about' component={About}/>
// <Route path='/search' component={Search}/>
