import { Routes, Route, Navigate } from "react-router-dom"

import { Layout } from "./components/Layout.jsx"

import { NotFound } from "./pages/NotFound.jsx"
import { Home } from "./pages/Home.jsx"

import { Login } from "./pages/auth/Login.jsx"
import { Register } from "./pages/auth/Register.jsx"
import { EventAdd } from "./pages/events/EventAdd.jsx"

// import { CalendarWidget } from "./components/widgets/CalendarWidget.jsx"

import { UserContextProvider } from './contexts/UserContext.jsx'
import { ServicesContextProvider } from './contexts/ServicesContext.jsx'


function App() {

  if (process.env.APP_ENV) {
    console.log("Environment: " + process.env.APP_ENV)
  }

  if (process.env.APP_DEBUG) {
    console.log("Debug enabled")
  }

  if (process.env.API_URL && process.env.APP_DEBUG) {
    console.log("API online, url is " + process.env.API_URL)
  }

  return (
    <ServicesContextProvider>
      <UserContextProvider>
        <Layout>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/calendar" element={<CalendarWidget/>}/> */}
            <Route path="/addevent" element ={ <EventAdd/> }/>
          </Routes>
        </Layout>
      </UserContextProvider>
    </ServicesContextProvider>
  )
}

export default App
