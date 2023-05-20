import { Pet, Size, Age, EnergyLevel } from '@prisma/client'

import { PetsRepository } from '@/repositories/petsRepository'

interface SearchPetsUseCaseRequest {
  city: string
  state: string
  size?: Size
  age?: Age
  energyLevel?: EnergyLevel
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    state,
    size,
    age,
    energyLevel,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyFromCity({
      city,
      state,
      size,
      age,
      energy_level: energyLevel,
    })

    return {
      pets,
    }
  }
}
