import React, { PropTypes } from 'react'
import {map as _map} from 'lodash'
import { uploadFiles, loadQueue, deleteUploadedFile } from 'redux/modules/files'
import { createImage } from 'redux/modules/images'
import { connect } from 'react-redux'
import Uploader from 'components/admin/Uploader'
import FileList from 'components/admin/FileList'

export class FileView extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    uploadFiles: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    deleteUploadedFile: PropTypes.func.isRequired,
    createImage: PropTypes.func.isRequired,
    queue: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className='container'>
        <Uploader uploadFiles={this.props.uploadFiles} />
        <FileList
          files={this.props.queue}
          loading={this.props.loading}
          deleteUploadedFile={this.props.deleteUploadedFile}
          createImage={this.props.createImage}
          loadFiles={this.props.loadQueue}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    queue: _map(state.files.queue),
    loading: state.files.loading
  }
}
export default connect((mapStateToProps), {
  uploadFiles,
  createImage,
  deleteUploadedFile,
  loadQueue
})(FileView)
