import ResourcePage from './ResourcePage'

export default function Activities() {
  const codespacesEndpoint =
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`

  return (
    <ResourcePage
      title="Activities"
      description="Review logged training activity sessions and recent performance history."
      resourcePath="activities/"
      codespacesEndpoint={codespacesEndpoint}
    />
  )
}
