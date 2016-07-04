import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { DropTarget } from 'react-dnd'

const imageTarget = {
  drop (props, monitor) {
    props.addImageToPost(monitor.getItem(), '0')
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}
export class PostMesh extends Component {

  static propTypes = {
    childWeight: PropTypes.array,
    children: PropTypes.array,
    horizontal: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    addImageToPost: PropTypes.func,
    isOver: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render () {
    const { horizontal, children, childWeight, connectDropTarget, isOver } = this.props

    let meshStyle = {
      minHeight: 100
    }
    if (isOver) {
      meshStyle.backgroundColor = 'tomato'
    }
    if (horizontal) {
      meshStyle.display = 'flex'
    }

    return connectDropTarget(
      <div style={meshStyle}>
      {React.Children.map(children, (c, i) => {
        let childStyle = {}
        if (horizontal) {
          childStyle.flexBasis = `${childWeight[i]}%`
          childStyle.WebkitFlexBasis = `${childWeight[i]}%`
        }
        return (
          <div key={i} style={childStyle} className='meshChildContainer'>
            {c}
          </div>
        )
      })}
      </div>
    )
  }
}

export default DropTarget('image', imageTarget, collect)(PostMesh)
