import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

import { Account, PrismaClient } from './generated/client'

dotenv.config({
	path: '.env.production.local'
})

const adapter = new PrismaPg({
	user: process.env.DATABASE_USER!,
	password: process.env.DATABASE_PASSWORD!,
	host: process.env.DATABASE_HOST!,
	port: Number(process.env.DATABASE_PORT!),
	database: process.env.DATABASE_NAME!
})

const prisma = new PrismaClient({ adapter })

const ACCOUNT: Account[] = [
	{
		//вадим
		id: 'c7TZMqTRfHd5h7A3M5Fjn',
		avatar: '',
		bio: 'Алкаш SSS ранга',
		displayName: 'VaDiMI4',
		loseAmount: 0,
		successRate: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		//кирик
		id: 'xnLWWxD_EJs4x_ppmgfdC',
		avatar: '',
		bio: 'Жертва рыбаков',
		displayName: 'Опарыш enjoyer',
		loseAmount: 0,
		successRate: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		//ярослейв
		id: 'Ks5-83ykyihsvSqkinBF5',
		avatar: '',
		bio: 'Анимешник',
		displayName: 'I<3Anime',
		loseAmount: 0,
		successRate: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		// вадич
		id: 'kxKqrnAfyD7tSQYCpDM32',
		avatar: '',
		bio: 'Психопат',
		displayName: 'VaDi4',
		loseAmount: 0,
		successRate: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		// диман
		id: 'eOM6mazeykaTsZBQdySVs',
		avatar: '',
		bio: 'Вайбкодер',
		displayName: 'ClaudeCodeEnjoyer',
		loseAmount: 0,
		successRate: 0,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		// мелстрой
		id: 'xujNktIqrMWy2i2pbc124',
		avatar: '',
		bio: 'Миллионер',
		displayName: 'MellStroy',
		loseAmount: -5234122,
		successRate: 3,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		// трамп
		id: 'JNdquv_PmkNpgmu8UQTEj',
		avatar: '',
		bio: 'President',
		displayName: 'Donald',
		loseAmount: -864300,
		successRate: 17,
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		// евелон
		id: 'xkes9LGPE4kBytCSe1JBX',
		avatar: '',
		bio: 'Твич легенда',
		displayName: 'Evelone666',
		loseAmount: -4355329,
		successRate: 8,
		createdAt: new Date(),
		updatedAt: new Date()
	}
]

async function seed() {
	console.log('Seeder started')

	try {
		await prisma.$transaction(async tx => {
			await tx.account.deleteMany()
			await tx.account.createMany({
				data: ACCOUNT
			})
		})
		console.log('Seeder successfully completed')
	} catch (e) {
		console.log('Seeder failed')
		console.log(e)
		process.exit(1)
	}
}

seed()
