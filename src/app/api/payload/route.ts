import payload from 'payload'

// This endpoint ensures Payload is initialized when Next.js starts.
// In dev, Next.js will initialize this on first call.

export async function GET() {
	if (!payload.db) {
		await payload.init({
			secret: process.env.PAYLOAD_SECRET || 'dev-secret',
			config: (await import('@/payload.config')).default,
		})
	}
	return new Response('OK')
}


