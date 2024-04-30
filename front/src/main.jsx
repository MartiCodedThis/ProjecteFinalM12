import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

import { UserContextProvider } from './contexts/UserContext.js'
import { ServicesContextProvider } from './contexts/ServicesContext.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ServicesContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </ServicesContextProvider>
)
