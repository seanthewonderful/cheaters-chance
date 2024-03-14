import React from 'react'

const Login = ({ registerClick }) => {

  return (
    <div>

      <form>
        <label>Username: </label>
        <input type="text" name="username" />
        <label>Password: </label>
        <input type="password" name="password" />
        <input type='submit' value='Login' />
      </form>
      
      <button onClick={registerClick}>Register</button>

    </div>
  )
}

export default Login