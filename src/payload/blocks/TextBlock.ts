import { Block } from 'payload/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const TextBlock: Block = {
	slug: 'textBlock',
	labels: { singular: 'Text Block', plural: 'Text Blocks' },
	fields: [
		{ name: 'content', type: 'richText', editor: lexicalEditor() },
		{
			name: 'dataSource',
			type: 'group',
			admin: { description: 'Optional: configure a REST API to populate the content.' },
			fields: [
				{ name: 'enabled', type: 'checkbox', defaultValue: false },
				{ name: 'url', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'bearerToken', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'headers', type: 'json', admin: { condition: (data) => data?.dataSource?.enabled } },
				{ name: 'jsonPath', type: 'text', admin: { condition: (data) => data?.dataSource?.enabled },
					adminDescription: 'JSONPath to extract value, e.g. $.description' },
			],
		},
	],
}

export default TextBlock


