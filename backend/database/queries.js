import { db, User, Game, Player } from './model.js';


const games = await Game.findOne({
  where: {
    name: 'As Game',
    // active: true
  }
})

console.log(games)

await db.close()