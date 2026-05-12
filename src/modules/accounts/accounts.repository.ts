import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { Account } from '../../../prisma/generated/client'
import {
	AccountCreateInput,
	AccountUpdateInput
} from '../../../prisma/generated/models'

@Injectable()
export class AccountsRepository {
	constructor(private readonly prismaService: PrismaService) {}

	public findById(id: string): Promise<Account | null> {
		return this.prismaService.account.findUnique({
			where: {
				id
			}
		})
	}

	public create(data: AccountCreateInput): Promise<Account | null> {
		return this.prismaService.account.create({
			data
		})
	}

	public update(id: string, data: AccountUpdateInput): Promise<Account | null> {
		return this.prismaService.account.update({
			where: { id },
			data
		})
	}
}
