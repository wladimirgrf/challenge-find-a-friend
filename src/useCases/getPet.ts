import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/petsRepository'

import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
