const express = require('express')
const Trail = require('../models/trails_schema.js')
const trails = express.Router()


//INDEX
trails.get('/', (req, res) => {
    Trail.find({}, (error, allTrails) => {
        res.render('trails/index.ejs', {
            trails: allTrails
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
    res.render('trails/new.ejs')
})

//POSTING FROM NEW ROUTE
trails.post('/', (req, res) => {
    Trail.create(req.body, (error, createdTrail) => {
        res.redirect('/trails')
    })
})

//SHOW
trails.get('/:id', (req, res) => {
    Trail.findById(req.params.id, (error, foundTrail) => {
        res.render('trails/show.ejs', {
            trail: foundTrail
        })
    })
})

//EDIT
trails.get('/:id/edit', (req, res) => {
    Trail.findById(req.params.id, (error, foundTrail) => {
        res.render('trails/edit.ejs', {
            trail: foundTrail
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

module.exports = trails