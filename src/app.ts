import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { ZodError } from 'zod'
import { resolve } from 'node:path'

import { env } from './env'

import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyMultipart)
app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,

  sign: { expiresIn: '10m' },
  cookie: { cookieName: 'refreshToken', signed: false },
})

app.register(fastifyStatic, {
  root: resolve(__dirname, '../assets'),
  prefix: '/assets',
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.issues })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error!' })
})
