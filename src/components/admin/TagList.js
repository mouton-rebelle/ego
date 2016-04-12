import React, {PropTypes, Component} from 'react'
import {removeTagForRef, addTagForRef, initTags} from 'redux/modules/tags'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'

function getSuggestionValue (suggestion) {
  return suggestion
}
function renderSuggestion (suggestion, {value}) {
  let start = suggestion.indexOf(value)
  let end = start + value.length

  return (
    <span>
      {suggestion.substring(0, start)}
      <strong>{suggestion.substring(start, end)}</strong>
      {suggestion.substring(end)}
    </span>
  )
}

export class TagList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTag: '',
      suggestions: []
    }
    this.onTagChange = (event, { newValue }) => {
      this.setState({
        newTag: newValue
      })
    }
    this.removeTag = (t) => {
      return () => {
        this.props.removeTagForRef(t, this.props.reference)
      }
    }
    this.addTag = () => {
      if (this.state.newTag) {
        this.props.addTagForRef(this.state.newTag, this.props.reference)
        this.setState({newTag: '', suggestions: []})
      }
    }
    this.onTagInputKeyUp = (event) => {
      if (event.keyCode === 13) {
        this.addTag()
      }
    }
    this.onSuggestionsUpdateRequested = ({value}) => {
      this.setState({
        suggestions: this.props.allTags.filter((t) => t.indexOf(value)!==-1)
      })
    }
  }
  static propTypes={
    tags: PropTypes.array.isRequired,
    init: PropTypes.func.isRequired,
    allTags: PropTypes.array.isRequired,
    reference: PropTypes.object.isRequired,
    removeTagForRef: PropTypes.func.isRequired,
    addTagForRef: PropTypes.func.isRequired
  };
  componentDidMount () {
    if (this.props.tags.length < 40) {
      this.props.init()
    }
  }
  render () {
    const inputProps = {
      placeholder: 'Type a tag',
      value: this.state.newTag,
      onChange: this.onTagChange,
      onKeyUp: this.onTagInputKeyUp,
      onBlur: this.addTag
    }

    return (
      <div className='tagList'>
        {this.props.tags.map((t, pos) => {
          return (
            <div className='tagList__tag' key={t} onClick={this.removeTag(t)}>{t}</div>
          )
        })}
        <Autosuggest suggestions={this.state.suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let tags = []
  if (ownProps.reference.store === 'files') {
    tags = state.files.queue[ownProps.reference.id].exif.tags
  }
  return {
    tags,
    allTags: state.tags.all
  }
}
export default connect((mapStateToProps), {
  removeTagForRef,
  addTagForRef,
  init: initTags
})(TagList)
