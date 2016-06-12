import Monk from 'monkii'
import {persistUploadedFile, getSizePromise, UPLOAD_DIR} from './file'
let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images'),
  posts: conn.get('posts')
}

export async function createImage (uploadedFilename, image) {
  const size = await getSizePromise(`${UPLOAD_DIR}/${uploadedFilename}`)
  const filename = await persistUploadedFile(uploadedFilename)
  image = {
    ...image,
    ...size,
    file: filename
  }
  await db.images.insert(image)
  return image
}

export async function updateImage (image) {

}

export async function deleteImage (imageId) {

}

export async function getUnlinkedImages (imageId) {
  return await db.images.find({postId: {$exists: false}})
}
