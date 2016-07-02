import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUnlinkedImages } from 'redux/modules/images'
import Post from 'components/Post'

export class ImageView extends React.Component {
  static propTypes = {
    loadUnlinkedImages: PropTypes.func.isRequired,
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
                <div className='imagePicker__item'>
                  <div
                    className='imagePicker__item__img'
                    style={{backgroundImage: `url('/orig/${img.file}')`}}>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='split'>
            <Post post={this.props.post} admin />
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
export default connect((mapStateToProps), {
  loadUnlinkedImages
})(ImageView)
