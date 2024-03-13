import {User, Game, Player, db} from './model.js'

console.log("Syncing database ...");

await db.sync({ force: true });

console.log("Seeding database ...");