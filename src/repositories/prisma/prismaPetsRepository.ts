import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { Replace } from '@/helpers/Replace'
import { PetsRepository } from '../petsRepository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async save(data: Replace<Prisma.PetUncheckedUpdateInput, { id: string }>) {
    const { id, ...props } = data

    const pet = await prisma.pet.update({
      where: { id },
      data: props,
    })

    return pet
  }
}
