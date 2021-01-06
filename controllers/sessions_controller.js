const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users_schema.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

sessions.get('/', (req, res) => {
    res.render('trails/index.ejs')
})

sessions.post('/', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err) {
            console.log(err);
            res.send('opps the database had a problem')
        }else if(!foundUser) {
            res.send('<a href="/">Sorry User not found</a>')
        }else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/')
                console.log('Signed in');
            }else {
                res.send('<a href="/"> Password does not match </a>')
            }
        }
    })
})

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions