const initialState = {
  user: null,
  game: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'SET_USER':
      return {
       ...state,
        user: action.payload
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        game: null
      }

    case 'SET_GAME':
      return {
        ...state,
        game: action.payload
      }

    default:
      return state
  }
}
