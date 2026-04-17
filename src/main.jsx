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
import Carrito from './carrito.jsx'
import './styles/index.css'

const pathname = window.location.pathname
const CurrentPage = pathname === '/carrito' ? Carrito : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentPage />
  </React.StrictMode>,
)
