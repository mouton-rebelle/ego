import gmBase from 'gm'
import * as _ from 'lodash'
import fs from 'fs'

const gm = gmBase.subClass({imageMagick: true})

const metas = {
  date: '%[EXIF:DateTimeOriginal]',
  tags: '%[IPTC:2:25]',
  aperture: '%[EXIF:ApertureValue]',
  speed: '%[EXIF:ShutterSpeedValue]',
  iso: '%[EXIF:ISOSpeedRatings]',
  bias: '%[EXIF:ExposureBiasValue]',
  apn: '%[EXIF:Model]'
}
// a string containing all the exif we want to retrieve
const metaString = _.map(metas, (m, k) => k+'####'+m).join('@@@@')

export function getExifPromise (source) {
  return new Promise((resolve, reject) => {
    gm(source).identify(metaString, (error, data) => {
      if (error) {
        reject(error)
      } else {
        let exif = {}
        data
          .split('@@@@')
          .forEach((kvString) => {
            const [key, value] = kvString.split('####')
            exif[key] = value
          })
        resolve(exif)
      }
    })
  })
}

export function writeThumb (source, dest, size = 200) {
  return new Promise((resolve, reject) => {
    gm(source)
      .resize(size, size)
      .noProfile()
      .write(dest, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(dest)
        }
      })
  })
}

export function processUploadedFile (stream) {
  return new Promise((resolve, reject) => {
    const filename = stream.filename
    const dest = `./src/static/upload/${filename}`
    const thumb = `./src/static/upload/thmb/${filename}`
    stream.on('end', () => {
      // the file is copied in dest
      getExifPromise(dest).then(
        (exif) => {
          writeThumb(dest, thumb).then(
            () => {
              resolve({
                exif,
                thumb: thumb.substring(12),
                source: dest.substring(12)
              })
            },
            (err) => {
              reject(err)
            }
          )
        },
        (err) => {
          reject(err)
        }
      )
    })
    stream.on('error', (err) => {
      reject(err)
    })
    stream.pipe(fs.createWriteStream(dest))
  })
}
