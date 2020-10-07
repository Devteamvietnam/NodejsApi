const express = require('express')
// const router = express.Router()

const router = require('express-promise-router')()

const UserController = require('../controller/user')

router.route("/users")
    .get(UserController.index)
    .post(UserController.newUser)

router.route("/users/:userID")
    .get(UserController.getUserById)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
module.exports = router