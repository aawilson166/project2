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
    res.redirect('/')
})

//SEED
trails.get('/setup/seed', (req, res) => {
    Trail.create(
        [
            {
                name: 'Rampage',
                location: 'Utah',
                difficulty: '...',
                image: 'https://www.bikes.com/sites/default/files/carson-rampage1.jpg',
                description: 'Invite only competition built by the worlds best builders for the worlds best riders'
            },
            {
                name: 'Snow Summit',
                location: 'Big Bear',
                difficulty: 'Hard',
                image: 'https://d1pdyfnmzhu191.cloudfront.net/images/librariesprovider2/default-album/time-to-rip-5463.jpg?sfvrsn=1&size=400',
                description: 'Open for Summer season, Ski lifts available. Terrain for every skill level'
            },
            {
                name: 'Skypark',
                location: 'Lake Arrowhead',
                difficulty: 'Hard',
                image: 'https://skyparksantasvillage.com/wp-content/uploads/bike-park-top1b.jpg',
                description: 'Open year round, no lifts available'
            },   
            {
                name: 'Double D',
                location: 'Murrieta',
                difficulty: 'Medium',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCaWBY2XhpjsOa487Mf0N1f5UZ-rrEBdExRA&usqp=CAU',
                description: 'In the greer ranch trail system. flowy trail with small jumps'
            },
            {
                name: 'Slaughterhouse',
                location: 'Locals only brah',
                difficulty: 'Hard',
                image: 'https://nobodyhikesinla.files.wordpress.com/2015/01/shc-bridge.jpg',
                description: 'Secret downhill trail, fast and flowy packed with large features'
                
            },
            {
                name: 'La Cresta',
                location: 'Murrieta',
                difficulty: 'Easy',
                image: 'https://i.ytimg.com/vi/nOf-4fmwjkA/maxresdefault.jpg'
            },
            {
                name: 'Distortion',
                location: 'Murrieta',
                difficulty: 'Easy',
                image: 'https://www.lagranderide.com/sites/lagranderide.com/files/0330171256.jpg',
                description: 'Nice and easy trail, good for the whole family'
            }
        ],
        (error, data) => {
            res.redirect('/')
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
        res.redirect('/')
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
            res.redirect('/')
        }
    )
})

trails.delete('/:id', (req, res) => {
    Trail.findByIdAndRemove(req.params.id, (err, deletedTrail) => {
        res.redirect('/')
    })
})

trails.get(
    '/dropdatabase/cannotundo/areyousure',
    (req, res) => {
        Trail.collection.drop()
        res.send('You dropped the Database!')
    }
)

module.exports = trails