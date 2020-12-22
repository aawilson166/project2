const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()

//allows heroku to use any port it wants and we can locally access our app using port 3003 *localhost3003* (or statement)
const PORT = process.env.PORT || 3003

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
})
