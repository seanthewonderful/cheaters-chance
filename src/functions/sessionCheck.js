import axios from 'axios'

const sessionCheck = (dispatch) => {
  axios.get(`/api/sessionCheck`)
  .then(res => {
    if(res.data.user){
      dispatch({
        type: 'SET_USER',
        payload: res.data.user
      })
    }
  })
  .catch(err => console.log(err))
}

export default sessionCheck