import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const logoutClick = () => {
    axios.get(`/api/logout`)
    .then(res => {
      navigate('/')
    })
  }


  return (
    <div id='not-found-div'>

      <div>
        <h1>404 Error: Page not found</h1>
      </div>

      <div>
        <img
          id="not-found-img"
          src="https://gifdb.com/images/high/wicked-villan-darth-vader-noooo-shouting-x8zaqkytb2n4q5m0.gif"
          alt=""
        />
      </div>

      <button onClick={() => navigate('/scuttlebutt/profile') }>Profile</button>
      <button onClick={logoutClick}>Logout</button>

    </div>
  )
}

export default NotFound