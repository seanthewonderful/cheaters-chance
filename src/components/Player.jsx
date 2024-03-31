import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";

const Player = ({ player }) => {

  return (
    <div id="player-div">

      <p>Player: {player.user.username}</p>
      <p>Total Dice: {player.dice}</p>

      <ul>
        <li><FaDiceOne />: {player.one}</li>
        <li><FaDiceTwo />: {player.two}</li>
        <li><FaDiceThree />: {player.three}</li>
        <li><FaDiceFour />: {player.four}</li>
        <li><FaDiceFive />: {player.five}</li>
        <li><FaDiceSix />: {player.six}</li>
      </ul>

    </div>
  )
}

export default Player