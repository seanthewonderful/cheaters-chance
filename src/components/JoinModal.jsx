import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const JoinModal = ({ game, toggleModal }) => {

    const navigate = useNavigate()

    const [password, setPassword] = useState('')

    const onSubmit = () => {
        if(game.password){
            axios.post('/api/joinGame', {name: game.name, password: password})
                .then(res => {
                    console.log(res.data)
                    navigate('/scuttlebutt/game')
                })
                .catch(err => {
                    console.log(err)
                    alert('Password Incorrect')
                })
        } else {
            axios.post('/api/joinGame', {name: game.name, password: null})
            .then(res => {
                console.log(res.data)
                navigate('/scuttlebutt/game')
            })
            .catch(err => {
                console.log(err)
                alert("I honestly don't know how you fucked this up")
            })
        }

    }

    return game.password ? (
        <div className='modal'>
            <section className='modal-section'>
                <p>Enter Password</p>
                <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
                <button onClick={toggleModal}>Cancel</button>
            </section>

        </div>

    ) : (

        <div className='modal'>
          <section className='modal-section'>
            <p>Are you sure you want to join {game.name}?</p>
            <button onClick={onSubmit}>Yes</button>
            <button onClick={toggleModal}>No</button>
          </section>
        </div>
    )
}

export default JoinModal