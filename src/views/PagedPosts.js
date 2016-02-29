import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Pager from 'components/Pager'
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class PagedPosts extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    nbPages: PropTypes.number.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <Pager basePath='/page/' currentPage={this.props.currentPage} nbPages={this.props.nbPages}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  nbPages: state.posts.nbPages,
  currentPage: state.posts.currentPage
})
export default connect((mapStateToProps), {
})(PagedPosts)
