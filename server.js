//Show data on correct pages and create navigation buttons
//add images to my schema
//get DB and collection to show up in mongo

const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

require('dotenv').config()
const app = express()
const db = mongoose.connection





//allows heroku to use any port it wants and we can locally access our app using port 3003 *localhost3003* (or statement)
const PORT = process.env.PORT || 3003

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})


//Succsess/Error handlers
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


//MIDDLEWARE
app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.get('/', (req, res) => {
  //res.send('Hello World')
})

// Controllers
const trailsController = require('./controllers/trails_controller.js')
app.use('/trails', trailsController)

const userController = require('./controllers/users_controller.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)




app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
})
