import Monk from 'monkii'
import { getExifPromise, SAVE_DIR } from '../server/api/file'
let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images')
}

function runFrom (position) {
  let allDone = []
  db.images.find({}, {limit: 40, skip: position}).then((images) => {
    images.forEach((image) => {
      let path = `.${SAVE_DIR}/${image.file}`
      allDone.push(new Promise((resolve, reject) => {
        getExifPromise(path).then(
          (exif) => {
            db.images.updateById(image._id, {$set: {
              bias: exif.bias,
              aperture: exif.aperture,
              iso: exif.iso,
              speed: exif.speed
            }})
            console.log(image.label)
            resolve(1)
          },
          (err) => {
            console.log(err)
            resolve(-1)
          }
        )
      }))
    })
    Promise.all(allDone).then(
      (done) => {
        if (done.length === 40) {
          runFrom(position+40)
        }
      }
    )
  })
}

runFrom(0)
