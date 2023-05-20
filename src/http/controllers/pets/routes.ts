import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'
import { upload } from './upload'
import { get } from './get'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', get)
  app.get('/pets/search', search)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.patch('/pets/:id/images', { onRequest: [verifyJWT] }, upload)
}
