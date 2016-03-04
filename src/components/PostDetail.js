import React, { PropTypes, Component } from 'react'
import ImageInfo from './ImageInfo'
import PostHeader from './PostHeader'
import { Link } from 'react-router'
import { history } from '../main'
import Btn from './Btn'
import { findIndex as _findIndex } from 'lodash'

function flattenImages (c, images) {
  if (c.image) {
    images.push(c.image)
    return images
  } else {
    if (!c.child) {
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
        case 37:
          history.push(this.prevUrl)
          break
        case 39:
          history.push(this.nextUrl)
          break
      }
    }
    this.updateImages(props.imageId)
  }

  componentWillReceiveProps (nextProps) {
    this.updateImages(nextProps.imageId)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  /**
   * TODO : pass this as props ? this looks messy
   */
  updateImages (imageId) {
    this.images = flattenImages(this.props, [])
    const postUrl = `/post/${this.props.id}`
    const currentImageIndex = _findIndex(this.images, {'_id': imageId})
    this.image = this.images[currentImageIndex]

    const next = (currentImageIndex<this.images.length-1) ? currentImageIndex + 1 : 0
    const prev = (currentImageIndex>0) ? currentImageIndex - 1 : this.images.length-1

    this.nextUrl = `${postUrl}/${this.images[next]._id}`
    this.prevUrl = `${postUrl}/${this.images[prev]._id}`
  }

  render () {
    const {title, desc, id} = this.props
    const postUrl = `/post/${id}`

    const overlayStyle = {backgroundImage: `url(/orig/${this.image.file})`}
    return (
      <div className='overlay' style={overlayStyle}>
        <div className='overlay__hud' style={{opacity: this.state.hud ? 1 : 0}}>

          <PostHeader className='pHead--dark' desc={desc} kind='dark' title={title}>
            <Btn text={`← ${title} `} url={postUrl} />
          </PostHeader>
          {this.images.length > 1 ? (
            <div className='imagePicker'>
              {this.images.map((img) => {
                let style = {
                  backgroundImage: `url(/orig/${img.file})`,
                  flexBasis: `${50 * img.ratio}px`,
                  WebkitFlexBasis: `${50 * img.ratio}px`,
                  border: img._id === this.props.imageId ? '1px solid #FFF' : '1px solid #000'
                }
                return (
                  <Link className='imagePicker__thumb' key={img._id} style={style} to={`${postUrl}/${img._id}`}>
                    {img.label}
                  </Link>
                )
              })}
              <ImageInfo image={this.image} />
            </div>
          ) : <div className='imagePicker'><ImageInfo image={this.image} /></div>}
        </div>
      </div>
    )
  }

}
