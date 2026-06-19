import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return (
    <div className="app-shell container py-4 py-md-5">
      <header className="mb-4">
        <h1 className="display-6 fw-bold mb-2">OctoFit Tracker Dashboard</h1>
        <p className="text-body-secondary mb-2">
          React 19 presentation tier connected to the Node.js API.
        </p>
        <p className="small mb-0">
          <span className="fw-semibold">Active API base:</span> {baseUrl}/api
        </p>
      </header>

      {!codespaceName && (
        <div className="alert alert-warning" role="alert">
          VITE_CODESPACE_NAME is not set. Using localhost fallback at
          {' '}
          http://localhost:8000/api.
        </div>
      )}

      <div className="alert alert-info" role="alert">
        Define VITE_CODESPACE_NAME in .env.local for Codespaces URLs.
      </div>

      <nav className="nav nav-pills nav-fill gap-2 mb-4">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
        <NavLink className="nav-link" to="/teams">
          Teams
        </NavLink>
        <NavLink className="nav-link" to="/activities">
          Activities
        </NavLink>
        <NavLink className="nav-link" to="/leaderboard">
          Leaderboard
        </NavLink>
        <NavLink className="nav-link" to="/workouts">
          Workouts
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
