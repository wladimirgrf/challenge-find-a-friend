import { PrismaOrgsRepository } from '@/repositories/prisma/prismaOrgsRepository'
import { GetProfileUseCase } from '../getOrgProfile'

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new GetProfileUseCase(orgsRepository)

  return useCase
}
