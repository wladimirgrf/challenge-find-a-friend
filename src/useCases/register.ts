import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgsRepository'
import { OrgAlreadyExistsError } from './errors/orgAlreadyExistsError'

interface RegisterUseCaseRequest {
  email: string
  password: string
  responsibleName: string
  whatsapp: string
  latitude: number
  longitude: number
  state: string
  city: string
  address: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
    responsibleName,
    whatsapp,
    latitude,
    longitude,
    state,
    city,
    address,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 7)

    const org = await this.orgsRepository.create({
      email,
      whatsapp,
      latitude,
      longitude,
      state,
      city,
      address,
      password_hash: passwordHash,
      responsible_name: responsibleName,
    })

    return {
      org,
    }
  }
}
