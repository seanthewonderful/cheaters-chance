import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = ({ loginClick }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    const body = {
      username,
      password,
      imgUrl,
    }

    axios.post(`/api/register`, body)
    .then(res => {
      alert(res.data.message)
      navigate('/profile')
    })
  }

  return (
    <div>

      <form onSubmit={handleRegister}>
        <h3>Register an Account</h3>
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
        <label>Confirm Password: </label>
        <input 
          type="password" 
          name="confirmPassword" 
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <label>Image URL: </label>
        <input type="text" name="imageURL" />
        <input type='submit' value='Register' />
      </form>

      <p>Already have an account?</p>
      <button 
        onClick={loginClick}
        >Login
      </button>

    </div>
  )
}

export default Register