import { PrismaOrgsRepository } from '@/repositories/prisma/prismaOrgsRepository'
import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { CreatePetUseCase } from '../createPet'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}
