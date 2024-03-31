import { db, User, Game, Player } from './model.js';

const user1 = await User.findOne()

const game = await user1.createGame({
    name: "Demo2",
    locked: false,
    password: "default",
    active: true,
    playerLimit: 4,
    startingDice: 6,
  }, { 
    include: { 
      model: Player 
    }
  }
  )

console.log(game)

await db.close()