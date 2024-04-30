import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const Login = ({ registerClick }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()

    const body = {
      username,
      password,
    }

    axios.post(`/api/login`, body)
    .then(res => {
      // alert(res.data.message)
      dispatch({
        type: 'SET_USER',
        payload: res.data.user
      })
      navigate('/scuttlebutt/profile')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-modal">

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
          autoComplete="off"
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          autoComplete="off"
        />
        <input type='submit' value='Login' />
      </form>

      <p>Need to create a new account?</p>
      <button
        onClick={registerClick}
        >Register
      </button>

    </div>
  )
}

export default Login