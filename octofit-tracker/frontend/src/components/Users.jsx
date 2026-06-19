import ResourcePage from './ResourcePage'

export default function Users() {
  const codespacesEndpoint =
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`

  return (
    <ResourcePage
      title="Users"
      description="View athlete profiles and account metadata from the logic tier API."
      resourcePath="users/"
      codespacesEndpoint={codespacesEndpoint}
    />
  )
}
