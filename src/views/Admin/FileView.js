import React, { PropTypes } from 'react'
import {map as _map, filter as _filter} from 'lodash'
import { uploadFiles, loadQueue, hoverFile, selectFile, deselectFile } from 'redux/modules/files'
import { connect } from 'react-redux'
import Uploader from 'components/admin/Uploader'
import FileList from 'components/admin/FileList'

export class FileView extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    hoverFile: PropTypes.func.isRequired,
    selectFile: PropTypes.func.isRequired,
    deselectFile: PropTypes.func.isRequired,
    hovered: PropTypes.object.isRequired,
    queue: PropTypes.array.isRequired
  };

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-60'>
            <Uploader uploadFiles={this.props.uploadFiles}/>
          </div>
          <div className='col-40'>
            <FileList
              hovered={this.props.hovered}
              files={this.props.queue}
              hover={this.props.hoverFile}
              select={this.props.selectFile}
              deselect={this.props.deselectFile}
              loadFiles={this.props.loadQueue}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let filtered = _filter(state.files.queue, (f) => f.filename === state.files.hover)
  console.log(filtered)
  return {
    queue: _map(state.files.queue),
    hovered: filtered.length === 1 ? filtered[0] : false
  }
}
export default connect((mapStateToProps), {
  uploadFiles,
  hoverFile,
  selectFile,
  deselectFile,
  loadQueue
})(FileView)
