import gmBase from 'gm'
import * as _ from 'lodash'
import fs from 'fs-promise'
import moment from 'moment'
const gm = gmBase.subClass({imageMagick: true})

// probably make this config or params
export const UPLOAD_DIR = './src/static/upload'
export const THUMB_UPLOAD_DIR = './src/static/upload/thmb'
export const SAVE_DIR = './src/static/orig'

// exif metas we want
const metas = {
  date: '%[EXIF:DateTimeOriginal]',
  tags: '%[IPTC:2:25]',
  aperture: '%[EXIF:ApertureValue]',
  speed: '%[EXIF:ShutterSpeedValue]',
  iso: '%[EXIF:ISOSpeedRatings]',
  bias: '%[EXIF:ExposureBiasValue]',
  apn: '%[EXIF:Model]'
}
// a string containing all the exif we want to retrieve, that we'll pass to identify
const metaString = _.map(metas, (m, k) => k+'####'+m).join('@@@@')

// rounds nicely aperture values
const parseAperture = (ap) => {
  if (ap.indexOf('/') !== -1) {
    let [a, b] = ap.split('/')
    return Math.round(a / b * 10) / 10
  } else {
    return ap
  }
}

// formats nicely speeds values (shitty exif norm)
const parseSpeed = (s) => {
  if (s.indexOf('/') !== -1) {
    let [a, b] = s.split('/')
    let base = Math.pow(2, (a / b))
    if (base > 1) {
      return `1/${Math.floor(base/10)*10}`
    } else {
      return Math.round(1/base*10)/10
    }
  } else {
    return s
  }
}

// formats nicely EV bias values (shitty exif norm)
const parseBias = (bias) => {
  if (bias.indexOf('/') !== -1) {
    let [a, b] = bias.split('/')
    let dir = '+'
    if (a.substring(0, 1) === '-') {
      a = a.substring(1)
      dir = '-'
    }
    a = parseInt(a)
    b = parseInt(b)
    if (a === 0 || b === 0) {
      return ''
    } else if (a % b === 0) {
      return `${dir}${a/b}`
    } else {
      if (b === 100) {
        a = Math.round(a/33.33333333)
        b = 3
      }
      return `${dir}${a}/${b}`
    }
  } else {
    return bias
  }
}

/**
 * Extract width & height data from file or stream
 *
 * @param {String} or {ReadableStream} [source]
 * @return {object} extracted exif data
 */
export async function getSizePromise (source) {
  return new Promise((resolve, reject) => {
    gm(source).size((error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Extract exif data from file or stream
 *
 * @param {String} or {ReadableStream} [source]
 * @return {object} extracted exif data
 */
export async function getExifPromise (source) {
  return new Promise((resolve, reject) => {
    gm(source).identify(metaString, (error, data) => {
      if (error) {
        reject(error)
      } else {
        let exif = {}
        data
          .split('@@@@')
          .forEach((kvString) => {
            let [key, value] = kvString.split('####')
            switch (key) {
              case 'date':
                value = moment.utc(value, 'YYYY:MM:DD HH:mm:ss').toDate()
                break
              case 'tags':
                value = value.trim() ? value.trim().split(';') : []
                break
              case 'speed':
                value = parseSpeed(value)
                break
              case 'aperture':
                value = parseAperture(value)
                break
              case 'iso':
                value = value * 1
                break
              case 'bias':
                value = parseBias(value)
                break
            }
            exif[key] = value
          })
        resolve(exif)
      }
    })
  })
}

/**
 * Write a thumbnail of [source] to [dest], fitting in a [size]px square
 * Does nothing if dest already exists
 *
 * @param {String} or {ReadableStream} [source] source image
 * @param {String} [dest] destination path
 * @param {Int} [size]
 *
 * @return {object} extracted exif data
 */
export async function writeThumb (source, dest, size = 200) {
  let already = false
  try {
    already = await fs.access(dest, fs.F_OK)
  } catch (err) {
  }
  if (!already) {
    return await new Promise((resolve, reject) => {
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
  } else {
    return dest
  }
}

/**
 * Reads the uploaded file [stream], writes it to upload, generate a thumb &
 * extracts exif data -- what could go wrong ?
 *
 * @param {ReadableStream} [source] stream image
 * @return {object} containing filename & exif data
 */
export function processUploadedFile (stream) {
  return new Promise((resolve, reject) => {
    const filename = stream.filename
    const dest = `${UPLOAD_DIR}/${filename}`
    const thumb = `${THUMB_UPLOAD_DIR}/${filename}`
    stream.on('end', () => {
      // the file is copied in dest
      getExifPromise(dest).then(
        (exif) => {
          writeThumb(dest, thumb).then(
            () => {
              resolve({
                exif,
                filename
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

/**
 * Retrieves all the files in the upload directory, generate a thumb if missing
 * extracts exif data and return as an array of {filename,exif}
 *
 * @return {array} containing filename & exif data
 */
export async function loadUploadedFiles () {
  const files = await fs.readdir(UPLOAD_DIR)
  // we need this to know if we got a file or a directory
  const filesInfos = await Promise.all(
    files.map((file) => fs.stat(`${UPLOAD_DIR}/${file}`))
  )
  // we filter (TODO cleaner way to exclude / include -- dotfiles ? mimetype ? extension ?)
  const filtered = files.filter((file, key) => filesInfos[key].isFile() && file !== '.DS_Store')

  // let's wait till we are sure all thumbs are generated
  await Promise.all(
    filtered.map((file) => writeThumb(`${UPLOAD_DIR}/${file}`, `${THUMB_UPLOAD_DIR}/${file}`))
  )

  // let's wait till we got all the exifs we need
  const exifs = await Promise.all(
    filtered.map((file) => getExifPromise(`${UPLOAD_DIR}/${file}`))
  )

  return filtered.map((filename, key) => {
    return {
      filename,
      exif: exifs[key]
    }
  })
}

// remove a file in the upload directory. @todo better security
export async function deleteFile (filename) {
  if (filename.substr(0, 2) === '..') {
    throw Error('nope')
  }
  await fs.remove(`${UPLOAD_DIR}/${filename}`)
  await fs.remove(`${THUMB_UPLOAD_DIR}/${filename}`)
  return filename
}

// move a file from the upload temp dir to the persisted files dir. @todo better security
export async function persistUploadedFile (orig, dest = null) {
  if (dest === null) {
    dest = orig
  }
  if (orig.substr(0, 2) === '..') {
    throw Error('nope')
  }
  await fs.move(`${UPLOAD_DIR}/${orig}`, `${SAVE_DIR}/${dest}`)
  await fs.remove(`${THUMB_UPLOAD_DIR}/${orig}`)
  return dest
}
