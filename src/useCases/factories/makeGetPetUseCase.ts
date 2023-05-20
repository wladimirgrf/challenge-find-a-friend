import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { GetPetUseCase } from '../getPet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(petsRepository)

  return useCase
}
