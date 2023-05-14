import { FastifyRequest, FastifyReply } from 'fastify'

import { makeGetOrgProfileUseCase } from '@/useCases/factories/makeGetOrgProfileUseCase'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  const { password_hash, ...safeInfo } = org

  return reply.status(200).send({
    org: safeInfo,
  })
}
