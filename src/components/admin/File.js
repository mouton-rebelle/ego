import React, { PropTypes, Component } from 'react'

export default class File extends Component {
  static propTypes={
    exif: PropTypes.object.isRequired,
    filename: PropTypes.string.isRequired
  }

  render () {
    const {filename} = this.props
    return (
      <div className='file' style={{backgroundImage: `url('/upload/thmb/${filename}')`}}>

      </div>
    )
  }

}
