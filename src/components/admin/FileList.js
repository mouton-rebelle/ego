import React, {PropTypes, Component} from 'react'
import File from 'components/admin/File'
import ImageInfo from 'components/ImageInfo'
export default class FileList extends Component {

  static propTypes={
    files: PropTypes.array.isRequired,
    hover: PropTypes.func.isRequired,
    hovered: PropTypes.object.isRequired,
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
        {this.props.hovered && <ImageInfo
          placement='admin'
          tags={this.props.hovered.exif.tags}
          takenOn={this.props.hovered.exif.date}
          title={this.props.hovered.filename}
          description=''
          apn={this.props.hovered.exif.apn}
          speed={this.props.hovered.exif.speed}
          aperture={this.props.hovered.exif.aperture}
          iso={this.props.hovered.exif.iso}
          bias={this.props.hovered.exif.bias}
          />
        }
        {this.props.files.map((f) =>
          <File key={f.filename} exif={f.exif} filename={f.filename} hover={this.props.hover}/>
        )}
      </div>
    )
  }
}
