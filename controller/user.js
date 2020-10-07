/**
 * we can interact with mongoose in three different ways:
 *  [✔] callBack
 *  [✔] promises
 *  [✔] Async / await (promises)
 */

 const User = require('../models/User')

  // callBack
// const index = (req, res, next) => {
//     // callBack way
//     User.find({}, (error, users) => {
//         if(error) next(error)
//         return res.status(200).json({users})
//     })
    
//     // return res.status(200).json({
//     //     message: 'You request to user handle'
//     // })
// }

// async / await
// express-promise-router remove try catch
const index = async (req, res, next) => {
        const users = await User.find({})
        return res.status(200).json({users})
}

const newUser = async (req, res, next) => {
        const newUser = new User(req.body)
        await newUser.save()
        return res.status(201).json({user: newUser})
}

// // Promise 
// const index = (req, res, next) => {
//     // Promises way
//     User.find({}).then((users) => {
//         res.status(200).json({users})
//     }).catch(error => next(error))
// }

// callback
// const newUser = (req, res, next) => {
//     console.log('req.body content', req.body)
//     //create object model

//     const newUser = new User(req.body)
//     console.log('newUser', newUser)
//     newUser.save((error, user) => {
//         console.error('Error', error)
//         console.log('UserSave', user)
//         return res.status(201).json({user})
//     })
// }
// Promise way
// const newUser = (req, res, next) => {
//     console.log('req.body content', req.body)
//     //create object model

//     const newUser = new User(req.body)
//     console.log('newUser', newUser)
//     newUser.save().then(user => {
//         return res.status(201).json({user})
//     }).catch(error => next(error))
// }

const getUserById = async (req, res, next) => {
    const { userID }= req.params
    const user = await User.findById(userID)
    return res.status(200).json({user})
}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({success: true})
}

const updateUser = async (req, res, next) => {
    // number of fields
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
    return res.status(200).json({success: true})

}


module.exports = {
    index,
    newUser,
    getUserById,
    replaceUser,
    updateUser
}