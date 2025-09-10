import { Block } from 'payload/types'

const CardList: Block = {
	slug: 'cardList',
	labels: { singular: 'Card List', plural: 'Card Lists' },
	fields: [
		{ name: 'title', type: 'text' },
		{
			name: 'items',
			type: 'array',
			admin: { description: 'Static items (ignored if dynamic source enabled).'},
			fields: [
				{ name: 'heading', type: 'text' },
				{ name: 'body', type: 'text' },
			],
		},
		{
			name: 'dataSource',
			type: 'group',
			admin: { description: 'Optional: configure a REST API to populate cards.' },
			fields: [
				{ name: 'enabled', type: 'checkbox', defaultValue: false },
				{ name: 'url', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'bearerToken', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'headers', type: 'json', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'arrayJsonPath', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled },
					adminDescription: 'JSONPath pointing to array of items, e.g. $.data.items' },
				{ name: 'headingJsonPath', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled },
					adminDescription: 'JSONPath per item for heading, e.g. $.name' },
				{ name: 'bodyJsonPath', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled },
					adminDescription: 'JSONPath per item for body, e.g. $.description' },
			],
		},
	],
}

export default CardList


