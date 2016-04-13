import Router from 'koa-router'
import * as commentsApi from './comments'
import asyncBusboy from 'async-busboy'
import * as postsApi from './posts'
import * as tagApi from './tag'
import * as _ from 'lodash'
import * as fileApi from './file'
import * as imageApi from './image'

let router = new Router()

router.get('/api/tags', async function (ctx, next) {
  ctx.type = 'application/json'
  let tags = await tagApi.all()
  ctx.body = JSON.stringify(tags)
})

router.post('/api/images', async function (ctx, next) {
  ctx.type = 'application/json'
  let {uploadedFilename, image} = ctx.request.body
  await imageApi.createImage(uploadedFilename, image)
  ctx.body = JSON.stringify(image)
})

router.get('/api/comments/post/:id', async function (ctx, next) {
  ctx.type = 'application/json'
  let comments = await commentsApi.getByPostId(ctx.params.id)
  ctx.body = JSON.stringify(comments)
})

router.get('/api/post/:id', async function (ctx, next) {
  ctx.type = 'application/json'
  let post = await postsApi.getById(ctx.params.id)
  ctx.body = JSON.stringify(post)
})

router.post('/api/comments', async function (ctx, next) {
  ctx.type = 'application/json'
  let comment = await commentsApi.save(ctx.request.body)
  ctx.body = JSON.stringify(comment)
})

router.get('/api/files', async function (ctx, next) {
  const files = await fileApi.loadUploadedFiles()
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(files)
})

router.delete('/api/file/:filename', async function (ctx, next) {
  const success = await fileApi.deleteFile(ctx.params.filename)
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(success)
})

router.post('/api/upload', async function (ctx, next) {
  const { files } = await asyncBusboy(ctx.req)
  const filesInfos = await Promise.all(
    files.map((uploadedFile) => {
      return fileApi.processUploadedFile(uploadedFile)
    })
  )
  ctx.type = 'application/json'
  ctx.body = JSON.stringify(filesInfos)
})

router.get('/api/posts', async function (ctx, next) {
  let range = _.get(ctx.request.headers, 'range', '0-10')
  let [ start = 0, end = 10 ] = range.split('-')
  let { posts, contentRange, partial } = await postsApi.getByRange(start, end)
  ctx.type = 'application/json'
  ctx.status = partial ? 206 : 200
  ctx.set('Content-Range', contentRange)
  ctx.set('Accept-Ranges', 'posts')
  ctx.set('Range-Unit', 'posts')
  ctx.body = JSON.stringify(posts)
})

export default router
