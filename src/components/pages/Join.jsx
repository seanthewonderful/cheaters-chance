import {useState, useEffect} from 'react'
import axios from 'axios'
import GameListItem from '../GameListItem'

const Join = () => {

  const [games, setGames] = useState([])

  const allGames = () => {
    axios.get('/api/allGames')
      .then((res) => {
        console.log(res.data)
        setGames(res.data.filteredGames)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    allGames()
  }, [])

  const gameMap = games.map(game => {
    return (<GameListItem game={game} key={game.gameId}/>)
  })

  return (
    <>
    <div>Join</div>
    {gameMap}
    </>

  )
}

export default Join