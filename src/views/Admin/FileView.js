import React, { PropTypes } from 'react'
import { uploadFiles, loadQueue } from 'redux/modules/files'
import { connect } from 'react-redux'
import Uploader from 'components/admin/uploader'

export class FileView extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-60'>
            UPLOADER
            <Uploader uploadFiles={this.props.uploadFiles}/>
          </div>
          <div className='col-40'>
            FILES QUEUE
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  queue: state.files.queue
})
export default connect((mapStateToProps), {
  uploadFiles,
  loadQueue
})(FileView)
