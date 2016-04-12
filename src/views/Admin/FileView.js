import React, { PropTypes } from 'react'
import {map as _map, filter as _filter} from 'lodash'
import { uploadFiles, loadQueue, hoverFile, selectFile, deselectFile, deleteUploadedFile } from 'redux/modules/files'
import { createImage } from 'redux/modules/images'
import { connect } from 'react-redux'
import Uploader from 'components/admin/Uploader'
import FileList from 'components/admin/FileList'

export class FileView extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    deleteUploadedFile: PropTypes.func.isRequired,
    hoverFile: PropTypes.func.isRequired,
    selectFile: PropTypes.func.isRequired,
    createImage: PropTypes.func.isRequired,
    deselectFile: PropTypes.func.isRequired,
    queue: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className='container'>
        <Uploader uploadFiles={this.props.uploadFiles}/>
        <FileList
          files={this.props.queue}
          hover={this.props.hoverFile}
          select={this.props.selectFile}
          deselect={this.props.deselectFile}
          deleteUploadedFile={this.props.deleteUploadedFile}
          createImage={this.props.createImage}
          loadFiles={this.props.loadQueue}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let filtered = _filter(state.files.queue, (f) => f.filename === state.files.hover)
  return {
    queue: _map(state.files.queue),
    hovered: filtered.length === 1 ? filtered[0] : false
  }
}
export default connect((mapStateToProps), {
  uploadFiles,
  hoverFile,
  createImage,
  deleteUploadedFile,
  selectFile,
  deselectFile,
  loadQueue
})(FileView)
