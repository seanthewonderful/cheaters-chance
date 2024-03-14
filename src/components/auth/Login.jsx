import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const Login = ({ registerModal, setRegisterModal }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const body = {
      username,
      password,
    }

    axios.post(`/api/login`, body)
    .then(res => {
      alert('Login Successful')
      navigate('/profile')
    })
  }

  return (
    <div>

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Username: </label>
        <input 
          type="text" 
          name="username" 
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input 
          type="password" 
          name="password" 
          onChange={e => setPassword(e.target.value)}
        />
        <input type='submit' value='Login' />
      </form>

      <button 
        onClick={() => setRegisterModal(!registerModal)}
        >Register
      </button>

    </div>
  )
}

export default Login