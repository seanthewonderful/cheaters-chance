import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sessionCheck from '../../functions/sessionCheck'

const Profile = () => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => async () => {
    if (!await sessionCheck(dispatch)) {
      navigate('/')
    }
  }, [])

  return user && (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      <h1>Profile</h1>
      <h4>Welcome, {user.username}</h4>
      <button>Host Game</button>
      <button onClick={() => navigate('/scuttlebutt/join')}>Join Game</button>
    </div>
  )
}

export default Profile