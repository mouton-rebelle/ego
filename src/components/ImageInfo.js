import React, { PropTypes, Component } from 'react'
import Tag from './Tag'
import Exif from './Exif'
import cx from 'classnames'
import moment from 'moment'

export default class ImageInfo extends Component {

  static propTypes = {
    tags: PropTypes.array.isRequired,
    takenOn: PropTypes.string.isRequired,
    placement: PropTypes.string.isRequired, // TODO oneof ?
    label: PropTypes.string.isRequired,
    desc: PropTypes.string,
    apn: PropTypes.string,
    speed: PropTypes.string.isRequired,
    aperture: PropTypes.number.isRequired,
    iso: PropTypes.number.isRequired,
    bias: PropTypes.string.isRequired
  }

  renderTag (t) {
    let cat = ''
    let name = t
    let temp = t.split(':')
    if (temp.length === 2) {
      [cat, name] = temp
    }
    let props = {category: cat, name: name}
    return <Tag key={t} {...props} />
  }

  render () {
    const {placement = 'bottom', tags, takenOn, label, desc, speed, aperture, iso, bias, apn} = this.props
    const classes = cx('imgInfo', `imgInfo--${placement}`)
    return (
      <div className={classes}>
        <h4 className='imgInfo__title'>{label}</h4>
        {desc ? <p className='imgInfo__desc' dangerouslySetInnerHTML={{__html: desc}} /> : null}
        <p className='imgInfo__desc'>{moment(takenOn).format('dddd DD MMMM YYYY [-] HH[h]mm')}</p>
        <p className='imgInfo__desc imgInfo__desc--exif'>
          <Exif value={apn} />
          <Exif value={aperture} prefix='f' />
          <Exif value={speed} suffix='s' />
          <Exif value={iso} prefix='ISO' />
          <Exif value={bias} suffix='EV' />
        </p>
        {tags
            .sort((a, b) => a > b ? 1 : -1)
            .map((t) => this.renderTag(t))
        }
      </div>
    )
  }
}
