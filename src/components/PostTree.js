import React, { PropTypes, Component } from 'react'
import PostMesh from './PostMesh'
import PostImage from './PostImage'

export default class PostTree extends Component {

  static propTypes = {
    child: PropTypes.array.isRequired,
    showOverlay: PropTypes.func.isRequired,
    horizontal: PropTypes.bool,
    weight: PropTypes.number
  };

  render () {
    const { horizontal, child, showOverlay } = this.props
    const childWeight = child.map((c) => c.weight)
    return (
      <PostMesh childWeight={childWeight} horizontal={horizontal}>
        {child.map((c, indice) => {
          if (c.image) {
            return <PostImage showOverlay={showOverlay} image={c.image} key={c.image.id} />
          } else {
            return <PostTree
              showOverlay={showOverlay}
              child={c.child}
              horizontal={c.horizontal} key={indice} weight={c.weight} />
          }
        })}
      </PostMesh>
    )
  }
}
