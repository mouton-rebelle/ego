/* @flow */

type Post = {
  _id: ?string,
  comments: Array<mixed>,
  child: Array<MeshItem>,
  horizontal: boolean,
  ratio: number,
  createdAt: ?string,
  title: string,
  order: number,
  desc: string,
  slug: string
}
type MeshItemMesh = {
  child: Array<MeshItem>,
  ratio: number,
  weight: number
}
type MeshItemImage = {
  _id: string,
  image: mixed,
  weight: number
}
type MeshItem = MeshItemImage | MeshItemMesh
type MeshOrRoot = Post | MeshItemMesh

/*
  Locate a mesh by id
 */
const locateMesh = function (root: MeshOrRoot, meshId: number, currentIndex: number = 0): MeshOrRoot {
  if (root.child) {
    root.child.forEach((meshItem:MeshItem, index:number) => {
      if ((index + currentIndex) === meshId) {
        return meshItem
      }
      if (meshItem.child) {
        try {
          return locateMesh(meshItem, meshId, index + currentIndex)
        } catch (error) {
        }
      }
    })
  }
  throw Error('mesh not found ')
}

export const addMeshAt = function (post:Post, meshId:number, pos:number = 0) {
  let mesh: MeshItemMesh = locateMesh(post, meshId)
  mesh.child.splice(pos, 0, {child: [], ratio: 1, weight: 100, horizontale: true})
}
export const toggleMeshDirection = function (meshId:number) {

}
export const removeMesh = function (meshId:number) {

}
export const moveMeshTo = function (meshId:number, targetMeshId:number, targetPos:number) {

}
