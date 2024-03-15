import React, { useEffect } from 'react'
import Host from '../Host'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sessionCheck from '../../functions/sessionCheck'

const Profile = () => {

  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    sessionCheck(dispatch)
  }, [])

  return user && (
    <div>
      <h1>Profile</h1>
      <h4>Welcome, {user.username}</h4>
    </div>
  )
}

export default Profile