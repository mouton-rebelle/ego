import React, { PropTypes } from 'react'
import { uploadFiles, loadQueue } from 'redux/modules/files'
import { connect } from 'react-redux'
import Uploader from 'components/admin/uploader'

export class FileView extends React.Component {
  static propTypes = {
    uploadFiles: PropTypes.func.isRequired,
    loadQueue: PropTypes.func.isRequired,
    queue: PropTypes.array.isRequired
  };

  render () {
    console.log(this.props)
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-60'>
            <Uploader uploadFiles={this.props.uploadFiles}/>
          </div>
          <div className='col-40'>
            {
              this.props.queue.map((file) =>
                <div>
                  <img src={file.thumb} />{file.source}
                </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    queue: state.files.queue
  }
}
export default connect((mapStateToProps), {
  uploadFiles,
  loadQueue
})(FileView)
