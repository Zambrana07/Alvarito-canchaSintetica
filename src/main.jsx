/*
  ============================================
  ENTRADA DE LA APP
  ============================================
  Este archivo solo "engancha" tu página (App) al HTML.
  No hace falta que lo modifiques.
*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
