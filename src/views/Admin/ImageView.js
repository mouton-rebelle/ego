import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUnlinkedImages } from 'redux/modules/images'
import { addImageToPost } from 'redux/modules/posts'
import Post from 'components/Post'
import ImageAdmin from 'components/Admin/Image'
var HTML5Backend = require('react-dnd-html5-backend')
var DragDropContext = require('react-dnd').DragDropContext

export class ImageView extends React.Component {
  static propTypes = {
    loadUnlinkedImages: PropTypes.func.isRequired,
    addImageToPost: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.loadUnlinkedImages()
  }

  render () {
    return (
      <div className='container'>
        <div className='split'>
          <div className='split__item'>
            <div className='imagePicker'>
              {this.props.images.map((img) =>
                <ImageAdmin key={img._id} img={img} />
              )}
            </div>
          </div>
          <div className='split__item split__item--edit'>
            <Post post={this.props.post} addImageToPost={this.props.addImageToPost} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let images = state.images.unlinked.map((id) => state.images.byId[id])
  return {
    images,
    post: state.posts.newPost
  }
}
export default DragDropContext(HTML5Backend)(connect((mapStateToProps), {
  loadUnlinkedImages,
  addImageToPost
})(ImageView))
