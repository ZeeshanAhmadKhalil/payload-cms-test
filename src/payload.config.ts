import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

import Users from './payload/collections/Users'
import Pages from './payload/collections/Pages'

// NOTE: Central Payload config - Postgres adapter, collections, admin user, and CORS/CSRF.

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || 'dev-secret',
	serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
	admin: {
		user: Users.slug,
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || 'postgres://localhost:5432/payload-cms-test',
		},
	}),
	collections: [Users, Pages],
	cors: ['http://localhost:3000'],
	csrf: ['http://localhost:3000'],
})


