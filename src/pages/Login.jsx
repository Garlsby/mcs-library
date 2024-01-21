import React from 'react'
import Loginform from '../components/Loginform'



const Login = ({isLogin, setLogin}) => {

  return (
    <div className="login-container w-screen">
      <Loginform
        isLogin={isLogin}
        setLogin={setLogin}/>
    </div>
  )
}

export default Login