import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeUploadPetImageUseCase } from '@/useCases/factories/makeUploadPetImageUseCase'

import { ResourceNotFoundError } from '@/useCases/errors/resourceNotFoundError'
import { InvalidImageFormatError } from '@/useCases/errors/invalidImageFormatError'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  if (!request.isMultipart()) {
    return reply.status(400).send({ message: 'The request is not multipart!' })
  }

  const upload = await request.file()

  if (!upload) {
    return reply.status(400).send({ message: 'An upload file is required!' })
  }

  try {
    const useCase = makeUploadPetImageUseCase()

    const { pet } = await useCase.execute({
      file: upload.file,
      mimetype: upload.mimetype,
      originalFileName: upload.filename,
      petId: id,
    })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (
      err instanceof ResourceNotFoundError ||
      err instanceof InvalidImageFormatError
    ) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
