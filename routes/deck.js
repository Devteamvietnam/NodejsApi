const express = require('express')
// const router = express.Router()

const router = require('express-promise-router')()

const DeckController = require('../controller/deck')

const { validateParam, schemas, validateBody } = require('../helpers/validator')

router.route("/decks")
    .get(DeckController.index)
    .post( validateBody(schemas.newDeckSchema), DeckController.newDeck)

router.route('/decks/:deckID')
    .get(validateParam(schemas.idSchema, 'deckID'), DeckController.getDeck)
    .put(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), DeckController.replaceDeck)
    .patch(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.deckOptionalSchema), DeckController.updateDeck)
    .delete(validateParam(schemas.idSchema, 'deckID'), DeckController.deleteDeck)
module.exports = router