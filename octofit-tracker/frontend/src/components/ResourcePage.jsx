import { useEffect, useMemo, useState } from 'react'

function normalizeItems(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length }
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) {
      return { items: payload.items, count: payload.count ?? payload.items.length }
    }

    if (Array.isArray(payload.results)) {
      return { items: payload.results, count: payload.count ?? payload.results.length }
    }

    if (Array.isArray(payload.data)) {
      return { items: payload.data, count: payload.count ?? payload.data.length }
    }
  }

  return { items: [], count: 0 }
}

export default function ResourcePage({ title, description, resourcePath, codespacesEndpoint }) {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const apiUrl = useMemo(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const localUrl = `http://localhost:8000/api/${resourcePath}`

    if (!codespaceName) {
      return localUrl
    }

    if (typeof codespacesEndpoint === 'string' && codespacesEndpoint) {
      return codespacesEndpoint
    }

    return `https://${codespaceName}-8000.app.github.dev/api/${resourcePath}`
  }, [codespacesEndpoint, resourcePath])

  useEffect(() => {
    let cancelled = false

    async function loadData() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeItems(payload)

        if (!cancelled) {
          setItems(normalized.items)
          setCount(normalized.count)
        }
      } catch (requestError) {
        if (!cancelled) {
          setItems([])
          setCount(0)
          setError(requestError instanceof Error ? requestError.message : 'Unknown error')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [apiUrl])

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <h2 className="h4 mb-0">{title}</h2>
          <span className="badge text-bg-dark">Count: {count}</span>
        </div>
        <p className="text-body-secondary mb-2">{description}</p>
        <p className="small mb-4">
          <span className="fw-semibold">Endpoint:</span> {apiUrl}
        </p>

        {loading && <div className="alert alert-info mb-0">Loading data...</div>}

        {!loading && error && (
          <div className="alert alert-danger mb-0">
            Could not load {title.toLowerCase()}. {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="alert alert-warning mb-0">No records found.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="row g-3">
            {items.map((item, index) => (
              <div key={item._id || index} className="col-12">
                <div className="rounded border bg-light-subtle p-3">
                  <pre className="mb-0 small resource-json">
                    {JSON.stringify(item, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
