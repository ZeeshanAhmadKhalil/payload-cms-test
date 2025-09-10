import 'dotenv/config'
import express from 'express'
import payload from 'payload'

const app = express()

async function start() {
	await payload.init({
		secret: process.env.PAYLOAD_SECRET || 'dev-secret',
		config: (await import('./payload.config')).default,
		express: app,
	})

	app.get('/', (_, res) => {
		res.redirect('/admin')
	})

	const port = Number(process.env.PORT || 3001)
	app.listen(port, () => {
		console.log(`Payload Admin running at ${process.env.PAYLOAD_PUBLIC_SERVER_URL || `http://localhost:${port}`}`)
	})
}

start()


