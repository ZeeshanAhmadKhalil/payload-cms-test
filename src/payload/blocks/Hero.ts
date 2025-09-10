import { Block } from 'payload/types'

// Hero block with optional dynamic data binding
const Hero: Block = {
	slug: 'hero',
	labels: { singular: 'Hero', plural: 'Heroes' },
	fields: [
		{ name: 'headline', type: 'text', required: false },
		{ name: 'subheadline', type: 'text', required: false },
		{
			name: 'dataSource',
			type: 'group',
			admin: { description: 'Optional: configure a REST API to populate the headline.' },
			fields: [
				{ name: 'enabled', type: 'checkbox', defaultValue: false },
				{ name: 'url', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{
					name: 'method',
					type: 'select',
					options: ['GET', 'POST'],
					defaultValue: 'GET',
					admin: { condition: (data) => data?.dataSource?.enabled },
				},
				{ name: 'bearerToken', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'headers', type: 'json', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'jsonPath', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled },
					adminDescription: 'JSONPath to extract value, e.g. $.title or $.data.items[0].name' },
			],
		},
	],
}

export default Hero


