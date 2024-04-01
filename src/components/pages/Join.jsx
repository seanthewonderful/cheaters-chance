import {useState, useEffect} from 'react'
import axios from 'axios'
import GameListItem from '../GameListItem'
import { useLoaderData } from 'react-router-dom'

const Join = () => {

  const games = useLoaderData()

  const gameMap = games.map(game => {
    if (game.active) {
      return (<GameListItem game={game} key={game.gameId}/>)
    }
  })

  return (
    <>
    <div>Join</div>
    {gameMap}
    </>

  )
}

export default Join

export const getJoinableGames = async () => {
  try {
    const res = await axios.get('/api/allGames')
    return res.data.filteredGames
  } catch (err) {
    console.log(err)
  }
}