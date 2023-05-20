import { PrismaPetsRepository } from '@/repositories/prisma/prismaPetsRepository'
import { LocalStorageProvider } from '@/providers/local/localStorageProvider'
import { UploadPetImageUseCase } from '../uploadPetImage'

export function makeUploadPetImageUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const storageProvider = new LocalStorageProvider()
  const useCase = new UploadPetImageUseCase(petsRepository, storageProvider)

  return useCase
}
