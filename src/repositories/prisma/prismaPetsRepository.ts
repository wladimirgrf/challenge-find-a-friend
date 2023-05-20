import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { Replace } from '@/helpers/Replace'
import { PetsRepository, FindManyFromCityProps } from '../petsRepository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        org: {
          select: {
            id: true,
            responsible_name: true,
            whatsapp: true,
            address: true,
            state: true,
            city: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    })

    return pet
  }

  async findManyFromCity({
    city,
    state,
    age,
    size,
    energy_level,
  }: FindManyFromCityProps) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        size,
        energy_level,
        org: {
          state,
          city: { mode: 'insensitive', equals: city },
        },
      },
    })

    return pets
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
