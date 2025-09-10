/*
  Client-side page preview that renders a Page document by slug.
  For learning: We fetch via REST from the same server.
*/
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { JSONPath } from 'jsonpath-plus'

type PageDoc = {
	_id: string
	title: string
	slug: string
	layout: Array<any>
}

// Utility: extract by JSONPath; returns string or null for single-value use-cases
function extractByJsonPath(json: unknown, path: string): string | null {
	try {
		const result = JSONPath({ path, json }) as unknown[]
		if (Array.isArray(result) && result.length > 0) {
			const value = result[0]
			return typeof value === 'string' ? value : JSON.stringify(value)
		}
		return null
	} catch {
		return null
	}
}

// Utility: perform a fetch with optional bearer and headers
async function fetchDynamic({ url, method = 'GET', bearerToken, headers, body }: any) {
	const mergedHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
	if (bearerToken) mergedHeaders['Authorization'] = `Bearer ${bearerToken}`
	if (headers && typeof headers === 'object') {
		for (const [k, v] of Object.entries(headers)) {
			if (typeof v === 'string') mergedHeaders[k] = v
		}
	}
	const res = await fetch(url, {
		method,
		headers: mergedHeaders,
		body: body ? JSON.stringify(body) : undefined,
		cache: 'no-store',
	})
	return res.json()
}

function Hero({ block }: { block: any }) {
	const { headline, subheadline, dataSource } = block
	const [value, setValue] = useState<string | null>(null)
	useEffect(() => {
		let ignore = false
		async function run() {
			if (dataSource?.enabled && dataSource.url && dataSource.jsonPath) {
				try {
					const data = await fetchDynamic(dataSource)
					const extracted = extractByJsonPath(data, dataSource.jsonPath)
					if (!ignore) setValue(extracted)
				} catch {}
			}
		}
		run()
		return () => { ignore = true }
	}, [dataSource])
	return (
		<section style={{ padding: 24, border: '1px solid #ddd', marginBottom: 16 }}>
			<h1 style={{ margin: 0 }}>{value ?? headline ?? 'Hero headline'}</h1>
			{subheadline && <p style={{ marginTop: 8 }}>{subheadline}</p>}
		</section>
	)
}

function TextBlock({ block }: { block: any }) {
	const { content, dataSource } = block
	const [value, setValue] = useState<string | null>(null)
	useEffect(() => {
		let ignore = false
		async function run() {
			if (dataSource?.enabled && dataSource.url && dataSource.jsonPath) {
				try {
					const data = await fetchDynamic(dataSource)
					const extracted = extractByJsonPath(data, dataSource.jsonPath)
					if (!ignore) setValue(extracted)
				} catch {}
			}
		}
		run()
		return () => { ignore = true }
	}, [dataSource])
	return (
		<section style={{ padding: 24, border: '1px solid #ddd', marginBottom: 16 }}>
			<div>{value ?? (typeof content === 'string' ? content : 'Text block')}</div>
		</section>
	)
}

function CardList({ block }: { block: any }) {
	const { title, items = [], dataSource } = block
	const [dynamicItems, setDynamicItems] = useState<Array<{ heading: string; body: string }>>([])
	useEffect(() => {
		let ignore = false
		async function run() {
			if (dataSource?.enabled && dataSource.url && dataSource.arrayJsonPath) {
				try {
					const data = await fetchDynamic(dataSource)
					const array = (JSONPath({ path: dataSource.arrayJsonPath, json: data }) as unknown[]) || []
					const mapped = array.map((row: any) => {
						const heading = dataSource.headingJsonPath ? extractByJsonPath(row, dataSource.headingJsonPath) : undefined
						const body = dataSource.bodyJsonPath ? extractByJsonPath(row, dataSource.bodyJsonPath) : undefined
						return { heading: heading || '', body: body || '' }
					})
					if (!ignore) setDynamicItems(mapped)
				} catch {}
			}
		}
		run()
		return () => { ignore = true }
	}, [dataSource])

	const renderItems = useMemo(() => (dataSource?.enabled ? dynamicItems : items), [dataSource, dynamicItems, items])

	return (
		<section style={{ padding: 24, border: '1px solid #ddd', marginBottom: 16 }}>
			{title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
				{(renderItems || []).map((it: any, idx: number) => (
					<article key={idx} style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
						<h3 style={{ marginTop: 0 }}>{it.heading}</h3>
						<p style={{ marginBottom: 0 }}>{it.body}</p>
					</article>
				))}
			</div>
		</section>
	)
}

export default function PreviewPage({ params }: { params: { slug: string } }) {
	const { slug } = params
	const [page, setPage] = useState<PageDoc | null>(null)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		let ignore = false
		async function run() {
			try {
				// Ensure Payload is initialized (routes/api/payload)
				await fetch('/api/payload')
				const res = await fetch(`/api/pages?where[slug][equals]=${encodeURIComponent(slug)}`, { cache: 'no-store' })
				const json = await res.json()
				const doc = json?.docs?.[0]
				if (!ignore) setPage(doc)
			} finally {
				if (!ignore) setLoading(false)
			}
		}
		run()
		return () => { ignore = true }
	}, [slug])

	if (loading) return <div style={{ padding: 24 }}>Loading…</div>
	if (!page) return <div style={{ padding: 24 }}>Not found</div>

	return (
		<main style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
			<h1 style={{ marginTop: 0 }}>{page.title}</h1>
			{(page.layout || []).map((block: any, i: number) => {
				switch (block.blockType) {
					case 'hero':
						return <Hero key={i} block={block} />
					case 'textBlock':
						return <TextBlock key={i} block={block} />
					case 'cardList':
						return <CardList key={i} block={block} />
					default:
						return null
				}
			})}
		</main>
	)
}


