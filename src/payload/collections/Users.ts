import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	admin: {
		useAsTitle: 'email',
	},
	fields: [
		// You can add roles, name fields etc. later
	],
}

export default Users


