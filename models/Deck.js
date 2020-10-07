const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeckSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Deck = mongoose.model('Deck', DeckSchema)

module.exports = Deck