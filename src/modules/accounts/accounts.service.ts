import {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	GetWorstPlayersRequest,
	GetWorstPlayersResponse,
	PatchUserRequest,
	PatchUserResponse
} from '@ciganov/contracts/dist/gen/user'
import { RpcStatus } from '@ciganov/core'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

import { AuthClientGrpc } from '@/infrastructure/grpc/clients/auth/auth.grpc'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { AccountsRepository } from './accounts.repository'

@Injectable()
export class AccountsService {
	constructor(
		private readonly repo: AccountsRepository,
		private readonly prismaService: PrismaService,
		private readonly authClient: AuthClientGrpc
	) {}

	async getWorstPlayers(
		data: GetWorstPlayersRequest
	): Promise<GetWorstPlayersResponse> {
		const { limit } = data
		const accounts = await this.prismaService.account.findMany({
			where: {
				successRate: { not: 0 },
				loseAmount: { not: 0 }
			},
			orderBy: [{ successRate: 'asc' }, { loseAmount: 'desc' }],
			take: limit
		})

		return {
			users: accounts.map(account => ({
				id: account.id,
				displayName: account.displayName ?? undefined,
				avatar: account.avatar ?? undefined,
				bio: account.bio ?? undefined,
				successRate: account.successRate,
				email: '',
				loseAmount: account.loseAmount
			}))
		}
	}

	async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		const { id } = data

		const profile = await this.repo.findById(id)

		if (!profile)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Profile not found'
			})

		const account = await lastValueFrom(
			this.authClient.getAccount({
				id
			})
		)

		return {
			user: {
				id: profile.id,
				email: account.email,
				avatar: profile.avatar ?? undefined,
				bio: profile.avatar ?? undefined,
				displayName: profile.displayName ?? undefined,
				loseAmount: profile.loseAmount,
				successRate: profile.successRate
			}
		}
	}

	async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		await this.repo.create(data)
		return { ok: true }
	}

	async patch(data: PatchUserRequest): Promise<PatchUserResponse> {
		const { user } = data

		const account = await this.repo.findById(user.id)

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'The user with this id not found'
			})

		const updateData = {
			displayName: user.displayName,
			bio: user.bio,
			successRate: user.successRate,
			loseAmount: user.loseAmount
		}

		await this.repo.update(user.id, updateData)

		return { ok: true }
	}
}
