import { CollectionConfig } from 'payload/types'
import Hero from '../blocks/Hero'
import TextBlock from '../blocks/TextBlock'
import CardList from '../blocks/CardList'

const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
		livePreview: {
			url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_PREVIEW_URL || 'http://localhost:3000'}/preview/${data?.slug || ''}`,
		},
	},
	versions: { drafts: true },
	fields: [
		{ name: 'title', type: 'text', required: true },
		{ name: 'slug', type: 'text', required: true, unique: true },
		{
			name: 'layout',
			type: 'blocks',
			labels: { singular: 'Section', plural: 'Sections' },
			blocks: [Hero, TextBlock, CardList],
		},
	],
}

export default Pages


