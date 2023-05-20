import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { makeCreatePetUseCase } from '@/useCases/factories/makeCreatePetUseCase'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    about: z.string().max(300),
    requirements: z.string().array().optional(),

    size: z.enum(['TINY', 'MEDIUM', 'LARGE']),
    age: z.enum(['PUPPY', 'ADULT']),

    energyLevel: z.enum([
      'SMALL',
      'REASONABLE',
      'ENERGETIC',
      'HIGH',
      'EXTREME',
    ]),
  })

  const { name, about, size, age, energyLevel, requirements } =
    bodySchema.parse(request.body)

  try {
    const useCase = makeCreatePetUseCase()

    const { pet } = await useCase.execute({
      name,
      about,
      size,
      age,
      energyLevel,
      orgId: request.user.sub,
      requirements,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
