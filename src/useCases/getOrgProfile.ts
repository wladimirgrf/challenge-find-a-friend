import { OrgsRepository } from '@/repositories/orgsRepository'
import { Org } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface GetProfileUseCaseRequest {
  orgId: string
}

interface GetProfileUseCaseResponse {
  org: Org
}

export class GetProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org,
    }
  }
}
