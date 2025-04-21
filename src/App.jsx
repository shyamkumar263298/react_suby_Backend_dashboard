import LandingPage from './vendorDashboard/pages/LandingPage'
import "./App.css"
import { Routes,Route } from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
