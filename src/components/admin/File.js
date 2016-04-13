import React, { PropTypes, Component } from 'react'
import Field from '../Field'
import Btn from '../Btn'
import TagList from './TagList'
import ImageInfo from '../ImageInfo'
export default class File extends Component {

  static propTypes={
    file: PropTypes.object.isRequired,
    createImage: PropTypes.func.isRequired,
    deleteUploadedFile: PropTypes.func.isRequired,
    hover: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.save = () => {
      const image = {
        label: this.refs.name.value,
        description: this.refs.description.value,
        ...this.props.file.exif
      }
      const data = {
        uploadedFilename: this.props.file.filename,
        image
      }
      this.props.createImage(data)
    }
    this.delete = () => {
      this.props.deleteUploadedFile(this.props.file.filename)
    }
  }

  render () {
    const tagReference = {
      store: 'files',
      id: this.props.file.filename
    }
    return (
      <div className='file'>
        <div
          className='file__fields'>
          <Field label='Name'>
            <input ref='name' defaultValue={this.props.file.filename.replace(/.jpg/i, '')} />
          </Field>
          <Field label='Description'>
            <textarea ref='description'></textarea>
          </Field>
          <Field label='Tags'>
            <TagList reference={tagReference} />
          </Field>
          <div className='form__action'>
            <Btn text='Delete uploaded file' handler={this.delete} />
            <Btn text='Save image' handler={this.save} />
          </div>
        </div>
        <div
          className='file__preview'
          style={{backgroundImage: `url('/upload/thmb/${this.props.file.filename}')`}}>
        </div>
        <div className='file__exif'>
          <ImageInfo
            placement='admin'
            tags={this.props.file.exif.tags}
            takenOn={this.props.file.exif.takenOn}
            title={this.props.file.filename}
            description=''
            apn={this.props.file.exif.apn}
            speed={this.props.file.exif.speed}
            aperture={this.props.file.exif.aperture}
            iso={this.props.file.exif.iso}
            bias={this.props.file.exif.bias}
            />
        </div>
      </div>
    )
  }

}
