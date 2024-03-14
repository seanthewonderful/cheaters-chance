import React from 'react'

const Register = ({ loginClick }) => {

  return (
    <div>

      <form>
        <label>Username: </label>
        <input type="text" name="username" />
        <label>Password: </label>
        <input type="password" name="password" />
        <label>Confirm Password: </label>
        <input type="password" name="confirmPassword" />
        <label>Image URL: </label>
        <input type="text" name="imageURL" />
        <input type='submit' value='Register' />
      </form>

      <button onClick={loginClick}>Login</button>

    </div>
  )
}

export default Register