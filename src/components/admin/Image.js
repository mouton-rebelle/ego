import React, {PropTypes} from 'react'
import { DragSource } from 'react-dnd'
const Types = {
  IMAGE: 'image'
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const ImgSource = {
  beginDrag (props) {
    // Return the data describing the dragged item
    const item = { id: props.img._id }
    return item
  },

  endDrag (props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }
    // When dropped on a compatible target, do something
    // const item = monitor.getItem()
    // const dropResult = monitor.getDropResult()
    // CardActions.moveCardToList(item.id, dropResult.listId);
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect (connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

const Image = ({img, isDragging, connectDragSource}) => {
  console.log(img)
  return connectDragSource(
    <div className={`imagePicker__item ${isDragging ? 'imagePicker__item--dragging' : ''}`}>
      <div
        className='imagePicker__item__img'
        style={{backgroundImage: `url('/orig/${img.file}')`}}>
      </div>
    </div>
  )
}

Image.propTypes = {
  img: PropTypes.object.isRequired
}

export default DragSource(Types.IMAGE, ImgSource, collect)(Image)
