const express = require('express')
const Trail = require('../models/trails_schema.js')
const trails = express.Router()

const isAuthenticated = (req, res, next) => { 
    if (req.session.currentUser) {
        return next()
    }else {
        res.redirect('/sessions/new')
    }
}

//INDEX
trails.get('/', (req, res) => {
    Trail.find({}, (error, allTrails) => {
        res.render('trails/index.ejs', {
            trails: allTrails,
            currentUser: req.session.currentUser
        })
    })
})

//this will redirect to /trails if user does not type it in.
trails.get('/', (req, res) => {
    res.redirect('/trails')
})

//SEED
trails.get('/setup/seed', (req, res) => {
    Trail.create(
        [
            {
                name: 'Double D',
                location: 'Murrieta',
                difficulty: 'Medium',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCaWBY2XhpjsOa487Mf0N1f5UZ-rrEBdExRA&usqp=CAU'
            },
            {
                name: 'Slaughterhouse',
                location: 'Murrieta',
                difficulty: 'Hard',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCaWBY2XhpjsOa487Mf0N1f5UZ-rrEBdExRA&usqp=CAU'
                
            },
            {
                name: 'La Cresta',
                location: 'Murrieta',
                difficulty: 'Easy',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCaWBY2XhpjsOa487Mf0N1f5UZ-rrEBdExRA&usqp=CAU'
            }
        ],
        (error, data) => {
            res.redirect('/trails')
        }
    )
})



//NEW
trails.get('/new', (req, res) => {
    res.render(
        'trails/new.ejs',
        {currentUser: req.session.currentUser}
        )
})

//POSTING FROM NEW ROUTE
trails.post('/', (req, res) => {
    Trail.create(req.body, (error, createdTrail) => {
        res.redirect('/trails')
    })
})

//SHOW
trails.get('/:id', isAuthenticated, (req, res) => {
        Trail.findById(req.params.id, (error, foundTrail) => {
            res.render('trails/show.ejs', {
                trail: foundTrail,
                currentUser: req.session.currentUser,
            })
        })
})

//EDIT
trails.get('/:id/edit', (req, res) => {
    Trail.findById(req.params.id, (error, foundTrail) => {
        res.render('trails/edit.ejs', {
            trail: foundTrail,
            currentUser: req.session.currentUser
        })
    })
})

//UPDATE(edited trail)
trails.put('/:id', (req, res) => {
    Trail.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/trails')
        }
    )
})

trails.delete('/:id', (req, res) => {
    Trail.findByIdAndRemove(req.params.id, (err, deletedTrail) => {
        res.redirect('/trails')
    })
})

module.exports = trails