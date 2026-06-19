import ResourcePage from './ResourcePage'

export default function Teams() {
  const codespacesEndpoint =
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`

  return (
    <ResourcePage
      title="Teams"
      description="Browse teams and member relationships used for community challenges."
      resourcePath="teams/"
      codespacesEndpoint={codespacesEndpoint}
    />
  )
}
