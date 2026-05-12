import {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	PatchUserRequest,
	PatchUserResponse
} from '@ciganov/contracts/dist/gen/user'
import { RpcStatus } from '@ciganov/core'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

import { AuthClientGrpc } from '@/infrastructure/grpc/clients/auth/auth.grpc'

import { AccountsRepository } from './accounts.repository'

@Injectable()
export class AccountsService {
	constructor(
		private readonly repo: AccountsRepository,
		private readonly authClient: AuthClientGrpc
	) {}

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
