import { PROTO_PATHS } from '@ciganov/contracts'
import { GrpcOptions } from '@nestjs/microservices'

export const grpcPackages = ['account.v1']

export const grpcProtoPaths = [PROTO_PATHS.ACCOUNT]

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
