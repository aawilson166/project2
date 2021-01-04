const mongoose = require('mongoose')

const trailSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String},
    difficulty: {type: String},
    image: {type: String}
})

const Trail = mongoose.model('Trail', trailSchema)

module.exports = Trail