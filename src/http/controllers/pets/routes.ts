import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'
import { upload } from './upload'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
  app.patch('/pets/:id/images', { onRequest: [verifyJWT] }, upload)
}
