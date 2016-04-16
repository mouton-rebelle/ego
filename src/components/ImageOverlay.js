import React, {PropTypes} from 'react'
import Btn from 'components/Btn'

const ImageOverlay = ({image, post, shown, close}) => {
  const classes = `overlay ${shown ? 'overlay--shown' : ''}`
  const overlayStyle = image ? {backgroundImage: `url(/orig/${image.file})`} : {}
  return (
    <div className={classes} style={overlayStyle}>
      <Btn handler={close} text='Close' />
    </div>
  )
}

ImageOverlay.propTypes = {
  image: PropTypes.object,
  post: PropTypes.object,
  shown: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default ImageOverlay
