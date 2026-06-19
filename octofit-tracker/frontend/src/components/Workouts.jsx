import ResourcePage from './ResourcePage'

export default function Workouts() {
  const codespacesEndpoint =
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

  return (
    <ResourcePage
      title="Workouts"
      description="Explore recommended training plans generated for different goals."
      resourcePath="workouts/"
      codespacesEndpoint={codespacesEndpoint}
    />
  )
}
