import { Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout.jsx'

import { NotFound } from './pages/NotFound.jsx'
import { Home } from './pages/Home.jsx'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
