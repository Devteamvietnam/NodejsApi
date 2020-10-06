/**
 * we can interact with mongoose in three different ways:
 *  [✔] callBack
 *  [x] promises
 *  [x] Async / await (promises)
 */

 // callBack
 const User = require('../models/User')
const index = (req, res, next) => {
    // callBack way
    User.find({}, (error, users) => {
        if(error) next(error)
        return res.status(200).json({users})
    })
    
    // return res.status(200).json({
    //     message: 'You request to user handle'
    // })
}

const newUser = (req, res, next) => {
    console.log('req.body content', req.body)
    //create object model

    const newUser = new User(req.body)
    console.log('newUser', newUser)
    newUser.save((error, user) => {
        console.error('Error', error)
        console.log('UserSave', user)
        return res.status(201).json({user})
    })
}

module.exports = {
    index,
    newUser
}