import React, { PropTypes, Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import Field from '../Field'
import Btn from '../Btn'
import ImageInfo from '../ImageInfo'
export default class File extends Component {

  static propTypes={
    file: PropTypes.object.isRequired,
    hover: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.hover = () => {
      this.props.hover(this.props.file.filename)
    }
    this.click = () => {
      if (this.props.file.selected) {
        this.props.deselect(this.props.file.filename)
      } else {
        this.props.select(this.props.file.filename)
      }
    }
    this.save = () => {
      console.log(this.refs.name.value)
    }
    this.state = {
      tags: [],
      suggestions: ['gens:lili', 'gens:camille']
    }
    this.handleDelete = (indice) => {
      let t = this.state.tags
      t.splice(indice, 1)
      this.setState({tags: t})
    }
    this.handleAddition = (tag) => {
      this.setState({tags: [...this.state.tags, {id: tag, text: tag}]})
    }
  }

  render () {
    return (
      <div className='file'>
        <div
          className='file__fields'>
          <Field label='Name'>
            <input ref='name' defaultValue={this.props.file.filename} />
          </Field>
          <Field label='Description'>
            <textarea></textarea>
          </Field>
          <Field label='Tags'>
            <ReactTags tags={this.state.tags}
              suggestions={this.state.suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition} />
          </Field>
          <div className='form__action'>
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
            takenOn={this.props.file.exif.date}
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
