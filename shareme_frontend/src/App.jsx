import React from 'react'

import {Routes,Route,useNavigate} from 'react-router-dom'
import {Login} from './components/index'
import Home from './Pages/Home'
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
} 

export default App