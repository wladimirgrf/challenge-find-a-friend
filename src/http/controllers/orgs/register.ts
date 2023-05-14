import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/useCases/errors/orgAlreadyExistsError'
import { makeRegisterUseCase } from '@/useCases/factories/makeRegisterUseCase'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const mobileRegExp =
    /^(?:(?:\+|00)55\s?)?(?:\(\d{2}\)|\d{2})\s?(?:9\s?)??\d{4}[- ]?\d{4}$/

  const registerBodySchema = z
    .object({
      responsibleName: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),

      whatsapp: z.string().regex(mobileRegExp, 'Invalid Phone Number!'),

      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password and confirm password must match!',
      path: ['confirmPassword'],
    })

  const { responsibleName, email, password, whatsapp, latitude, longitude } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      responsibleName,
      email,
      whatsapp,
      password,
      latitude,
      longitude,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
