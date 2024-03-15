import { db, User, Game, Player } from './model.js';

console.log(await Game.findAll())

await db.close()