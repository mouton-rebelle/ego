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

  parseAperture (ap) {
    if (ap.indexOf('/') !== -1) {
      let [a, b] = ap.split('/')
      return Math.round(a / b * 10) / 10
    } else {
      return ap
    }
  }

  parseSpeed (s) {
    console.log(s)
    if (s.indexOf('/') !== -1) {
      let [a, b] = s.split('/')
      let base = Math.pow(2, (a / b))
      if (base > 1) {
        return `1/${Math.floor(base/10)*10}`
      } else {
        return Math.round(1/base*10)/10
      }
    } else {
      return s
    }
  }

  render () {
    const {image} = this.props
    return (
      <div className='imgInfo'>
        <h4 className='imgInfo__title'>{image.label}</h4>
        <p className='imgInfo__desc' dangerouslySetInnerHTML={{__html: image.desc}}/>
        <p className='imgInfo__desc'>{moment(image.takenOn).format('DD/MM/YYYY [@] HH:mm')}</p>
        <p className='imgInfo__desc'>
          f{this.parseAperture(image.aperture)}&nbsp;
          {this.parseSpeed(image.speed)}s&nbsp;
          iso: {image.iso} {image.bias}</p>
        {image.tags
            .sort((a, b) => a > b ? 1 : -1)
            .map((t) => this.renderTag(t))
        }
      </div>
    )
  }
}
