import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = ({ registerModal, setRegisterModal }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()

    const body = {
      username,
      password,
      confirmPassword,
      imageURL,
      email,
      firstName,
      lastName,
    }

    axios.post(`/api/register`, body)
    .then(res => {
      alert('Register Successful')
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
        <label>First Name: </label>
        <input 
          type='text'
          name='firstName'
          onChange={e => setFirstName(e.target.value)}
        />
        <label>Password: </label>
        <input 
          type="password" 
          name="password" 
          onChange={e => setPassword(e.target.value)}
        />
        <label>Confirm Password: </label>
        <input type="password" name="confirmPassword" />
        <label>Image URL: </label>
        <input type="text" name="imageURL" />
        <label>Email: </label>
        <input type="text" name="email" />
        <input type='submit' value='Register' />
      </form>

      <button 
        onClick={() => setRegisterModal(!registerModal)}
        >Login
      </button>

    </div>
  )
}

export default Register