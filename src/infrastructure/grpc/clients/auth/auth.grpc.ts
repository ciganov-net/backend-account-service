import {
	AccountServiceClient,
	GetAccountRequest
} from '@ciganov/contracts/dist/gen/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService: AccountServiceClient
	public constructor(
		@Inject('ACCOUNT_PACKAGE') private readonly client: ClientGrpc
	) {}

	public onModuleInit() {
		this.authService =
			this.client.getService<AccountServiceClient>('AccountService')
	}

	public getAccount(request: GetAccountRequest) {
		return this.authService.getAccount(request)
	}
}
