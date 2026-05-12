import { Module } from '@nestjs/common'

import { AuthGrpcModule } from '@/infrastructure/grpc/clients/auth/auth.module'

import { AccountsController } from './accounts.controller'
import { AccountsRepository } from './accounts.repository'
import { AccountsService } from './accounts.service'

@Module({
	controllers: [AccountsController],
	imports: [AuthGrpcModule],
	providers: [AccountsService, AccountsRepository]
})
export class AccountsModule {}
