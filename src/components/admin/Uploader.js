import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'

export default class Uploader extends Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired
  }
  constructor (props, context) {
    super(props, context)
    this.state = {
      files: []
    }
  }

  onDrop (files) {
    console.log('Received files: ', files)
  }

  render () {
    return (
      <div>
        <Dropzone
          accept='image/*'
          onDrop={this.props.uploadFiles}
          style={{}}
          className='dropzone'
          activeClassName='dropzone--active'
          rejectedClassName='dropzone--rejected'
          >
          <div className='dropzone__legend'>Drop images to upload</div>
        </Dropzone>
      </div>
    )
  }
}
