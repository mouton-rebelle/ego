import React, { PropTypes, Component } from 'react'

export default class File extends Component {
  static propTypes={
    exif: PropTypes.object.isRequired,
    hover: PropTypes.func.isRequired,
    filename: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.hoverMe = this.hoverMe.bind(this)
  }

  hoverMe () {
    this.props.hover(this.props.filename)
  }

  render () {
    const {filename} = this.props
    return (
      <div className='file' onMouseEnter={this.hoverMe} style={{backgroundImage: `url('/upload/thmb/${filename}')`}}>

      </div>
    )
  }

}
