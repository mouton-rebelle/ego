import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadUnlinkedImages } from 'redux/modules/images'
import ImageInfo from 'components/ImageInfo'

export class ImageView extends React.Component {
  static propTypes = {
    loadUnlinkedImages: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired
  };

  componentWillMount () {
    this.props.loadUnlinkedImages()
  }

  render () {
    return (
      <div className='container' style={{background: 'tomato'}}>
        {this.props.images.map((img) =>
          <div className='file'>
            <div
              className='file__preview'
              style={{backgroundImage: `url('/orig/${img.file}')`}}>
            </div>
            <div className='file__exif'>
              <ImageInfo {...img} placement='admin' />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let images = state.images.unlinked.map((id) => state.images.byId[id])
  return {
    images
  }
}
export default connect((mapStateToProps), {
  loadUnlinkedImages
})(ImageView)
