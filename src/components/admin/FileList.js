import React, {PropTypes, Component} from 'react'
import File from 'components/admin/File'
export default class FileList extends Component {

  static propTypes={
    files: PropTypes.array.isRequired,
    createImage: PropTypes.func.isRequired,
    deleteUploadedFile: PropTypes.func.isRequired,
    hover: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired,
    loadFiles: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.loadFiles()
  }

  render () {
    if (!this.props.files || !this.props.files.length) {
      return (<div>No files yet</div>)
    }
    return (
      <div className='fileList'>

        {this.props.files.map((f) =>
          <File
            key={f.filename}
            file={f}
            deleteUploadedFile={this.props.deleteUploadedFile}
            createImage={this.props.createImage}
            hover={this.props.hover}
            select={this.props.select}
            deselect={this.props.deselect}
            />
        )}
      </div>
    )
  }
}
