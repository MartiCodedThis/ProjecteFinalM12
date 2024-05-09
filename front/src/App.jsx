//React
import { Routes, Route, Navigate } from "react-router-dom"

//Components
import { Layout } from "./components/Layout.jsx"

//Pages
import { NotFound } from "./pages/NotFound.jsx"
import { Home } from "./pages/Home.jsx"
import { Login } from "./pages/auth/Login.jsx"
import { Register } from "./pages/auth/Register.jsx"
import { PersonalCalendar } from "./pages/PersonalCalendar.jsx"
import { EventShow } from "./pages/events/EventShow.jsx"

//Context
import { UserContextProvider } from './contexts/UserContext.jsx'
import { ServicesContextProvider } from './contexts/ServicesContext.jsx'
import TaskShow from "./pages/tasks/TaskShow.jsx"
import { Profile } from "./pages/Profile.jsx"

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
            <Route path="/calendar" element={<PersonalCalendar/>}/>
            <Route path="/profile" element={ <Profile/> } />
            <Route path="/events/:id" element={<EventShow/>} />
            <Route path="/tasks/:id" element={ <TaskShow/> } />
          </Routes>
        </Layout>
      </UserContextProvider>
    </ServicesContextProvider>
  )
}

export default App
