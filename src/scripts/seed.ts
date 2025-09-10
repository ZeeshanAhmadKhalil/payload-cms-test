import 'dotenv/config'
import payload from 'payload'

async function run() {
	await payload.init({
		secret: process.env.PAYLOAD_SECRET || 'dev-secret',
		config: (await import('../payload.config')).default,
	})

	// Ensure at least one admin user exists
	const existingUsers = await payload.find({ collection: 'users', limit: 1 })
	if (existingUsers.totalDocs === 0) {
		await payload.create({ collection: 'users', data: { email: 'admin@example.com', password: 'admin' } })
		console.log('Created admin user: admin@example.com / admin')
	}

	// Create a sample page
	const slug = 'hello-world'
	const existingPages = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
	if (existingPages.totalDocs === 0) {
		await payload.create({
			collection: 'pages',
			data: {
				title: 'Hello World',
				slug,
				layout: [
					{ blockType: 'hero', headline: 'Welcome!', subheadline: 'This is a hero block.' },
					{ blockType: 'textBlock', content: 'This is a text block. You can make it dynamic.' },
					{ blockType: 'cardList', title: 'Cards', items: [
						{ heading: 'First', body: 'Card body 1' },
						{ heading: 'Second', body: 'Card body 2' },
					] },
				],
			},
		})
		console.log('Created sample page: /preview/hello-world')
	}

	process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })


