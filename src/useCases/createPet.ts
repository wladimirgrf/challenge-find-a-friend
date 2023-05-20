import { OrgsRepository } from '@/repositories/orgsRepository'
import { PetsRepository } from '@/repositories/petsRepository'
import { Age, Pet, Size, EnergyLevel } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  size: Size
  age: Age
  energyLevel: EnergyLevel
  requirements?: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    size,
    age,
    energyLevel,
    requirements,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      size,
      age,
      requirements,
      energy_level: energyLevel,
      org: { connect: { id: orgId } },
    })

    return {
      pet,
    }
  }
}
