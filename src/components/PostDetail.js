import React, { PropTypes, Component } from 'react'
import ImageInfo from './ImageInfo'
import PostHeader from './PostHeader'
import { Link } from 'react-router'
import Btn from './Btn'

function flattenImages (c, images) {
  if (c.image) {
    images.push(c.image)
    return images
  } else {
    if (!c.child) {
      console.error(c)
      return null
    }
    c.child.forEach((child) => flattenImages(child, images))
    return images
  }
}

export default class Post extends Component {

  static propTypes = {
    child: PropTypes.array.isRequired,
    desc: PropTypes.string,
    horizontal: PropTypes.bool,
    id: PropTypes.string.isRequired,
    imageId: PropTypes.string,
    title: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props, context)
    this.state = {
      hud: true
    }

    this.onKeyDown = (evt) => {
      switch (evt.keyCode) {
        case 32:
          this.setState({hud: !this.state.hud})
          break
        default:
          console.log(evt.keyCode)
      }
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    const {title, desc, id, imageId} = this.props
    const images = flattenImages(this.props, [])
    const postUrl = `/post/${id}`
    const image = images.filter((img) => img._id === imageId)[0]
    const overlayStyle = {backgroundImage: `url(/orig/${image.file})`}
    return (
      <div className='overlay' style={overlayStyle}>
        <div className='overlay__hud' style={{opacity: this.state.hud ? 1 : 0}}>

          <PostHeader className='pHead--dark' desc={desc} kind='dark' title={title}>
            <Btn text={`← ${title} `} url={postUrl} />
          </PostHeader>
          {images.length > 1 ? (
            <div className='imagePicker'>
              {images.map((img) => {
                let style = {
                  backgroundImage: `url(/orig/${img.file})`,
                  flexBasis: `${50 / img.ratio}px`,
                  WebkitFlexBasis: `${img.ratio * 50}px`
                }
                return (
                  <Link className='imagePicker__thumb' key={img._id} style={style} to={`${postUrl}/${img._id}`}>
                    {img.label}
                  </Link>
                )
              })}
              <ImageInfo image={image} />
            </div>
          ) : ''}
        </div>
      </div>
    )
  }

}
