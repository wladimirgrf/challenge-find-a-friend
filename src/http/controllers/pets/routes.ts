import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verifyJWT'

import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
