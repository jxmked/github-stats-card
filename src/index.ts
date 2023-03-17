import dotenv from 'dotenv';
import Fetcher from './data-fetcher/fetcher';
import express from 'express'

dotenv.config();


const app = express()
const port = process.env.port??9000;


const func = (req, res) => {
  console.log(req)
  res.send("hey")
}

const main = (req, res) => {
  console.log(req)
  res.send("hey")
}

const sele = (req, res) => {
  console.log(req)
  res.send("hey")
}

app.get("/", main)
app.get("/:userid/stats-card", sele)
app.get("/stats-card/starship-avalon", func)

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
});

