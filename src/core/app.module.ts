import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { PrismaModule } from '@/infrastructure/prisma/prisma.module'
import { AccountsModule } from '@/modules/accounts/accounts.module'
import { ObservabilityModule } from '@/observability/observability.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				`.env`
			]
		}),
		LoggerModule.forRoot({
			pinoHttp: {
				level: process.env.LOG_LEVEL,
				transport: {
					target: 'pino/file',
					options: {
						destination: '/var/log/services/account/account.log',
						mkdir: true
					}
				},
				messageKey: 'msg',
				customProps: () => ({
					service: 'account-service'
				})
			}
		}),
		ObservabilityModule,
		PrismaModule,
		AccountsModule
	]
})
export class AppModule {}
