import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeGetPetUseCase } from '@/useCases/factories/makeGetPetUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const useCase = makeGetPetUseCase()

    const { pet } = await useCase.execute({
      petId: id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
