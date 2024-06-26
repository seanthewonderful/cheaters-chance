import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const Register = ({ loginClick }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    if (password !== confirmPassword){
      alert('Passwords do not match')
      return
    }

    const body = {
      username,
      password,
      imgUrl,
    }

    axios.post(`/api/register`, body)
    .then(res => {
      alert(res.data.message)
      dispatch({
        type: 'SET_USER',
        payload: res.data.newUser
      })
      navigate('/scuttlebutt/profile')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="register-modal">

      <form onSubmit={handleRegister}>
        <h3>Register an Account</h3>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          autoFocus
          onChange={e => setUsername(e.target.value)}
          autoComplete='off'
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          autoComplete='off'
        />
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          onChange={e => setConfirmPassword(e.target.value)}
          autoComplete='off'
        />
        <label>Image URL: </label>
        <input
          type="text"
          name="imageURL"
          onChange={e => setImgUrl(e.target.value)}
          autoComplete='off'
        />
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