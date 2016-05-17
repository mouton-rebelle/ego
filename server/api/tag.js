import Monk from 'monkii'
import {uniq as _uniq} from 'lodash'

let conn = Monk('localhost/ego')
let db = {
  images: conn.get('images')
}

export async function all () {
  let images = await db.images.find({}, {tags: 1})
  let tags = []
  images.forEach((img) => {
    tags.push(...img.tags)
  })
  return _uniq(tags)
}
