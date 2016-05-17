import React, {PropTypes} from 'react'
import ImageInfo from 'components/ImageInfo'
import PostHeader from 'components/PostHeader'
import Btn from 'components/Btn'

const ImageOverlay = ({image, post, shown, close, hud, toggleHud}) => {
  const classes = `overlay ${shown ? 'overlay--shown' : ''} ${hud ? 'overlay--withHUD' : ''}`
  const overlayStyle = image ? {backgroundImage: `url(/orig/${image.file})`} : {}
  return (
    <div className={classes} style={overlayStyle}>
      <div className='overlay__hud'>
        {
          post
          ? <PostHeader className='pHead--dark' desc={post.desc} kind='dark' title={post.title}>
            <Btn handler={toggleHud} text='Infos [space]' variant='hud' />
            <Btn handler={close} text='Fermer [esc]' variant='hud' />
          </PostHeader>
          : null
        }
        {
          image
          ? <ImageInfo placement='bottom' {...image} />
          : null
        }
      </div>
    </div>
  )
}

ImageOverlay.propTypes = {
  image: PropTypes.object,
  post: PropTypes.object,
  shown: PropTypes.bool.isRequired,
  hud: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  toggleHud: PropTypes.func.isRequired
}

export default ImageOverlay
