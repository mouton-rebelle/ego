import Monk from 'monk'
import {persistUploadedFile} from './file'
let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images'),
  posts: conn.get('posts')
}

export async function createImage (uploadedFilename, image) {
  const filename = await persistUploadedFile(uploadedFilename)
  image.file = filename
  db.images.insert(image)
}

export async function updateImage (image) {

}

export async function deleteImage (imageId) {

}

export async function getUnlinkedImages (imageId) {
  return await db.images.find({postId: {$exists: false}})
}
