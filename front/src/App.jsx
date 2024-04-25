import { Routes, Route } from "react-router-dom"

import { Layout } from "./components/Layout.jsx"

import { NotFound } from "./pages/NotFound.jsx"
import { Home } from "./pages/Home.jsx"

import { Login } from "./pages/auth/Login.jsx"
import { Register } from "./pages/auth/Register.jsx"

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
