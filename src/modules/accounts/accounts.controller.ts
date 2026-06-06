import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	GetWorstPlayersRequest,
	GetWorstPlayersResponse,
	PatchUserRequest,
	PatchUserResponse
} from '@ciganov/contracts/dist/gen/user'
import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { AccountsService } from './accounts.service'

@Controller()
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@GrpcMethod('UserService', 'GetMe')
	public async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		return await this.accountsService.getMe(data)
	}

	@GrpcMethod('UserService', 'PatchUser')
	public async patch(data: PatchUserRequest): Promise<PatchUserResponse> {
		return await this.accountsService.patch(data)
	}

	@GrpcMethod('UserService', 'CreateUser')
	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		return await this.accountsService.create(data)
	}

	@GrpcMethod('UserService', 'GetWorstPlayers')
	public async getWorstPlayers(
		data: GetWorstPlayersRequest
	): Promise<GetWorstPlayersResponse> {
		return await this.accountsService.getWorstPlayers(data)
	}
}
