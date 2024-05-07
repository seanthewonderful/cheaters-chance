import { db, User, Game, Player } from './model.js';


let game = await Game.findByPk(7, {
  include: {
    model: Player,
    include: {
      model: User
    }
  }
})

console.log(game)

await db.close()