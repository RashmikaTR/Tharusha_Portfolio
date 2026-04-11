import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PersonalityProvider } from './PersonalityContext'

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <PersonalityProvider>
      <App />
    </PersonalityProvider>
  </React.StrictMode>,
)
