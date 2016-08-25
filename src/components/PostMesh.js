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
    toggleMeshDirection: PropTypes.func,
    isOver: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  warpWithOverlay (c, horizontal, toggleMeshDirection = null) {
    return (
      <div className='amc'>
        <div className='amc__overlay'>
          <div className='amcBt'>Drag</div>
          <div className='amcBt'>Drop</div>
          <button onClick={toggleMeshDirection} className='amcBt'>{horizontal ? 'vertical' : 'horizontal'}</button>
        </div>
        <div className='amc__content'>
          {c}
        </div>
      </div>
    )
  }

  baseRender (meshStyle, children, horizontal, childWeight, admin = false) {
    return (
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

  render () {
    const { horizontal, children, childWeight, connectDropTarget, isOver, toggleMeshDirection } = this.props

    let meshStyle = {
      minHeight: 100
    }
    if (isOver) {
      meshStyle.backgroundColor = 'tomato'
    }
    if (horizontal) {
      meshStyle.display = 'flex'
    }
    if (connectDropTarget) {
      return connectDropTarget(
        this.warpWithOverlay(
          this.baseRender(meshStyle, children, horizontal, childWeight, true),
          horizontal, toggleMeshDirection
        )
      )
    } else {
      return this.baseRender(meshStyle, children, horizontal, childWeight)
    }
  }
}
export default PostMesh
export const AdminPostMesh = DropTarget('image', imageTarget, collect)(PostMesh)
