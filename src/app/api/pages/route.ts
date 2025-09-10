import payload from 'payload'

export async function GET(request: Request) {
	if (!payload.db) {
		await payload.init({
			secret: process.env.PAYLOAD_SECRET || 'dev-secret',
			config: (await import('@/payload.config')).default,
		})
	}
	const { searchParams } = new URL(request.url)
	const whereParam = searchParams.get('where')
	let where: any = undefined
	if (whereParam) {
		try { where = JSON.parse(whereParam as any) } catch {}
	}
	const docs = await payload.find({ collection: 'pages', where })
	return Response.json(docs)
}


