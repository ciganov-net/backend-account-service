import { PROTO_PATHS } from '@ciganov/contracts'
import { GrpcOptions } from '@nestjs/microservices'

export const grpcPackages = ['user.v1']

export const grpcProtoPaths = [PROTO_PATHS.USER]

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
