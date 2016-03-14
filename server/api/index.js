import Router from 'koa-router'
import * as commentsApi from './comments'
import * as postsApi from './posts'
import * as _ from 'lodash'

let router = new Router()

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
