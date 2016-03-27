import React, { PropTypes, Component } from 'react'
import cx from 'classnames'

export default class File extends Component {
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
  }

  static propTypes={
    file: PropTypes.object.isRequired,
    hover: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired
  }

  render () {
    const classes = cx('file', {'file--selected': this.props.file.selected})
    return (
      <div
        className={classes}
        onMouseOver={this.hover}
        onClick={this.click}
        style={{backgroundImage: `url('/upload/thmb/${this.props.file.filename}')`}}
      >

      </div>
    )
  }

}
