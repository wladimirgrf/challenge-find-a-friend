import { Prisma, Pet, Size, Age, EnergyLevel } from '@prisma/client'

export interface FindManyFromCityProps {
  city: string
  state: string
  size?: Size
  age?: Age
  energy_level?: EnergyLevel
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyFromCity(props: FindManyFromCityProps): Promise<Pet[]>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  save(data: Prisma.PetUpdateInput): Promise<Pet>
}
