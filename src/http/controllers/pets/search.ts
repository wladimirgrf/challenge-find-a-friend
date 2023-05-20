import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/useCases/factories/makeSearchPetsUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    city: z.string(),
    state: z.string().length(2).toUpperCase(),

    size: z.enum(['TINY', 'MEDIUM', 'LARGE']).optional(),
    age: z.enum(['PUPPY', 'ADULT']).optional(),

    energyLevel: z
      .enum(['SMALL', 'REASONABLE', 'ENERGETIC', 'HIGH', 'EXTREME'])
      .optional(),
  })

  const { city, state, size, age, energyLevel } = querySchema.parse(
    request.query,
  )

  try {
    const useCase = makeSearchPetsUseCase()

    const { pets } = await useCase.execute({
      city,
      state,
      size,
      age,
      energyLevel,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
