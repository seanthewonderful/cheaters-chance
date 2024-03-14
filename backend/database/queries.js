import { db, User, Game, Player } from './model.js';

const foundUser = await User.findOne({
  where: {
      username: "sean",
      password: "f"
  }
})

console.log(foundUser)

await db.close()