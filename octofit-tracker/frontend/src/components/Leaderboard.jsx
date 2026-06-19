import ResourcePage from './ResourcePage'

export default function Leaderboard() {
  const codespacesEndpoint =
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`

  return (
    <ResourcePage
      title="Leaderboard"
      description="Track rankings and points to compare progress across participants."
      resourcePath="leaderboard/"
      codespacesEndpoint={codespacesEndpoint}
    />
  )
}
