import { db, User, Game, Player } from './model.js';

let game = await Game.findOne()
await game.removePlayer(2)
game = await Game.findByPk(1, {
  include: {
    model: Player,
    include: {
      model: User
    }
  }
})

console.log(game)

await db.close()