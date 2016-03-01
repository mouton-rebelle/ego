import React, { PropTypes, Component } from 'react'
import Tag from './Tag'
import moment from 'moment'

export default class ImageInfo extends Component {

  static propTypes = {
    image: PropTypes.object.isRequired
  }

  renderTag (t) {
    let temp = t.split(':')
    let [cat, name] = temp
    let props = {category: cat, name: name}
    return <Tag key={t} {...props}/>
  }

  render () {
    const {image} = this.props
    return (
      <div className='imgInfo'>
        <h4 className='imgInfo__title'>{image.label}</h4>
        <p className='imgInfo__desc' dangerouslySetInnerHTML={{__html: image.desc}}/>
        <p className='imgInfo__desc'>{moment(image.takenOn).format('DD/MM/YYYY [@] HH:mm')}</p>
        <p className='imgInfo__desc'>f{eval(image.aperture)} s{eval(image.speed)} iso: {image.iso} {image.bias}</p>
        {image.tags
            .sort((a, b) => a > b ? 1 : -1)
            .map((t) => this.renderTag(t))
        }
      </div>
    )
  }
}
