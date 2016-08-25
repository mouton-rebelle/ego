import React, { PropTypes, Component } from 'react'
import PostMesh, {AdminPostMesh} from './PostMesh'
import PostImage from './PostImage'

/**
 * HOC used to determine if we are at a leaf level, and shall render an image,
 * or at a branch, and then shall render a Mesh
 */

export default class PostTree extends Component {

  static propTypes = {
    child: PropTypes.array.isRequired,
    showOverlay: PropTypes.func.isRequired,
    addImageToPost: PropTypes.func,
    toggleMeshDirection: PropTypes.func,
    horizontal: PropTypes.bool,
    weight: PropTypes.number
  };

  render () {
    const { horizontal, child, showOverlay, addImageToPost, toggleMeshDirection } = this.props
    const childWeight = child.map((c) => c.weight)
    const Mesh = addImageToPost ? AdminPostMesh : PostMesh
    return (
      <Mesh
        childWeight={childWeight}
        horizontal={horizontal}
        addImageToPost={addImageToPost}
        toggleMeshDirection={toggleMeshDirection}>
        {child.map((c, indice) => {
          if (c.image) {
            return <PostImage showOverlay={showOverlay} image={c.image} key={c.image.id} />
          } else {
            if (c.child) {
              return <PostTree
                addImageToPost={addImageToPost} toggleMeshDirection={toggleMeshDirection}
                showOverlay={showOverlay}
                child={c.child}
                horizontal={c.horizontal} key={indice} weight={c.weight} />
            }
          }
        })}
      </Mesh>
    )
  }
}
