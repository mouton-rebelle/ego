import React, { PropTypes, Component } from 'react'
import PostMesh from './PostMesh'
import PostImage from './PostImage'

export default class PostTree extends Component {

  static propTypes = {
    child: PropTypes.array.isRequired,
    showOverlay: PropTypes.func.isRequired,
    addImageToPost: PropTypes.func,
    horizontal: PropTypes.bool,
    weight: PropTypes.number
  };

  render () {
    const { horizontal, child, showOverlay, addImageToPost } = this.props
    const childWeight = child.map((c) => c.weight)
    return (
      <PostMesh childWeight={childWeight} horizontal={horizontal} addImageToPost={addImageToPost}>
        {child.map((c, indice) => {
          if (c.image) {
            return <PostImage showOverlay={showOverlay} image={c.image} key={c.image.id} />
          } else {
            if (c.child) {
              return <PostTree
                addImageToPost={addImageToPost}
                showOverlay={showOverlay}
                child={c.child}
                horizontal={c.horizontal} key={indice} weight={c.weight} />
            } else {

            }
          }
        })}
      </PostMesh>
    )
  }
}
