const express = require('express')
// const router = express.Router()

const router = require('express-promise-router')()

const UserController = require('../controller/user')

const { validateParam, schemas } = require('../helpers/validator')

router.route("/users")
    .get(UserController.index)
    .post(UserController.newUser)

router.route("/users/:userID")
    .get( validateParam(schemas.idSchema, 'userID') ,UserController.getUserById)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
router.route("/users/:userID/decks")
    .get(UserController.getUserDeck)
    .post(UserController.newUserDeck)
module.exports = router