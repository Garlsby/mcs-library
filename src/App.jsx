import React,{ useEffect, useState } from 'react'
import { validateToken } from './apis/api'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './pages/login'

function App() {
  const [isLogin, setLogin] = useState(false)


  const TokenValidation = async() => {
    try {
      const response = await validateToken()
      if (response === "Token is valid") {
        setLogin(true)
      }else {
        setLogin(false)
      }
      return response
    }catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    TokenValidation()
  },[])
  return (
    <Router>
      <Routes>
        {
          isLogin 
          ? <Route path='/' element={<Home isLogin={isLogin} setLogin={setLogin}/>}/>
          : <Route path='/' element={<Login isLogin={isLogin} setLogin={setLogin}/>} />
        }
      </Routes>
    </Router>
  )
}

export default App
