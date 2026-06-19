# OctoFit Tracker Frontend

This React 19 + Vite presentation tier uses react-router-dom and fetches data from the backend API.

## Environment configuration

Define VITE_CODESPACE_NAME in .env.local when running in GitHub Codespaces.

Example .env.local:

VITE_CODESPACE_NAME=your-codespace-name

When VITE_CODESPACE_NAME is set, API requests use:

https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

When VITE_CODESPACE_NAME is not set, the app safely falls back to:

http://localhost:8000/api/[component]/
