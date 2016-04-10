import React, {PropTypes, Component} from 'react'
import {removeTagForRef, addTagForRef} from 'redux/modules/tags'
import { connect } from 'react-redux'
export class TagList extends Component {
  constructor (props) {
    super(props)
    this.removeTag = (t) => {
      return () => {
        this.props.removeTagForRef(t, this.props.reference)
      }
    }
    this.addTag = () => {
      this.props.addTagForRef(this.refs.newTag.value, this.props.reference)
    }
  }
  static propTypes={
    tags: PropTypes.array.isRequired,
    reference: PropTypes.string.isRequired,
    removeTagForRef: PropTypes.func.isRequired,
    addTagForRef: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='tagList'>
        {this.props.tags.map((t, pos) => {
          return (
            <div className='tagList__tag' onClick={this.removeTag(t)}>{t}</div>
          )
        })}
        <input type='text' ref='newTag' onBlur={this.addTag}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let tags = []
  if (state.tags.assignedToRef.hasOwnProperty(ownProps.reference)) {
    tags = state.tags.assignedToRef[ownProps.reference]
    console.log(tags)
  }
  return {
    tags
  }
}
export default connect((mapStateToProps), {
  removeTagForRef,
  addTagForRef
})(TagList)
