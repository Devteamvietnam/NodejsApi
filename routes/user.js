const express = require('express')
// const router = express.Router()

const router = require('express-promise-router')()

const UserController = require('../controller/user')

const { validateParam, schemas, validateBody } = require('../helpers/validator')

router.route("/users")
    .get(UserController.index)
    .post( validateBody(schemas.bodySchema), UserController.newUser)

router.route("/users/:userID")
    .get( validateParam(schemas.idSchema, 'userID') ,UserController.getUserById)
    .put( validateParam(schemas.idSchema, 'userID'), validateBody(schemas.bodySchema) ,UserController.replaceUser)
    .patch( validateParam(schemas.idSchema, 'userID'), validateBody(schemas.updateBodySchema) ,UserController.updateUser)

router.route("/users/:userID/decks")
    .get( validateParam(schemas.idSchema, 'userID'), UserController.getUserDeck)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.decksSchema), UserController.newUserDeck)
module.exports = router