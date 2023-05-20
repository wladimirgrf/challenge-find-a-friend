import { randomUUID } from 'node:crypto'
import { extname } from 'node:path'
import { Readable } from 'node:stream'
import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/petsRepository'
import { StorageProvider } from '@/providers/storageProvider'

import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { InvalidImageFormatError } from './errors/invalidImageFormatError'

interface UploadPetImageUseCaseRequest {
  petId: string
  originalFileName: string
  mimetype: string
  file: Readable
}

interface UploadPetImageUseCaseResponse {
  pet: Pet
}

export class UploadPetImageUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({
    petId,
    originalFileName,
    mimetype,
    file,
  }: UploadPetImageUseCaseRequest): Promise<UploadPetImageUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const mimeTypeRegex = /^image\/(jpeg|png|svg\+xml)$/

    const isValidFileFormat = mimeTypeRegex.test(mimetype)

    if (!isValidFileFormat) {
      throw new InvalidImageFormatError()
    }

    const fileId = randomUUID()
    const extension = extname(originalFileName)

    const filename = fileId.concat(extension)

    const { fileUrl } = await this.storageProvider.upload({ filename, file })

    pet.images.push(fileUrl)

    await this.petsRepository.save(pet)

    return {
      pet,
    }
  }
}
