import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sessionCheck from '../../functions/sessionCheck'
import axios from 'axios'

import HostModal from '../HostModal'

const Profile = () => {

  const user = useSelector(state => state.user)
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const logoutClick = () => {
    axios.get(`/api/logout`)
    .then(res => {
      if (res.status === 200) {
        window.location.reload()
      }
    })
  }

  useEffect(() => async () => {
    if (!await sessionCheck(dispatch)) {
      navigate('/')
    }
  }, [])

  return user && (
    <div>
      <HostModal isOpen={modalOpen} closeModal={closeModal} />

      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={logoutClick}>Logout</button>
      <h1>Profile</h1>
      <h4>Welcome, {user.username}</h4>
      <button onClick={openModal}>Host Game</button>
      <button onClick={() => navigate('/scuttlebutt/join')}>Join Game</button>
    </div>
  )
}

export default Profile