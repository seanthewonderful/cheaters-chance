import express from 'express'
import ViteExpress from 'vite-express'
import morgan from 'morgan'
import session from 'express-session'

const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "shhhhhhh",
    saveUninitialized: false,
    resave: false,
  })
);

ViteExpress.listen(app, 9987, () => console.log('Cheat here - http://localhost:9987'))