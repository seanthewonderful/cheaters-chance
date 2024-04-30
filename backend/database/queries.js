import { db, User, Game, Player } from './model.js';

const game = await Game.findOne({
  where: {
    gameId: 28
  },
  include: {
    model: Player,
    include: {
      model: User
    }
  }
})

console.log(game)

await db.close()