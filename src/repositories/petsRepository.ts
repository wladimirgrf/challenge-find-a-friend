import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  save(data: Prisma.PetUpdateInput): Promise<Pet>
}
