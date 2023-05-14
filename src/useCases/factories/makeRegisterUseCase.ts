import { PrismaOrgsRepository } from '@/repositories/prisma/prismaOrgsRepository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterUseCase(orgsRepository)

  return useCase
}
