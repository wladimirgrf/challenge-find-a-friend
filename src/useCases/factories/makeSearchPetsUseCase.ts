import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { SearchPetsUseCase } from '../searchPets'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}
