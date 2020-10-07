const bodyParser = require('body-parser')
const express = require('express')
// logger
const logger = require('morgan')

const usersRoute = require('./routes/user')

const app = express()

//DB
const mongooClient = require('mongoose')
    mongooClient.connect('mongodb://localhost:27017/nodejsapi', {
         useNewUrlParser: true,
         useUnifiedTopology: true 
        })
        .then(() => {
            console.log(' Connected ✔')})
        .catch(() => {
            console.error(` ❌ Connect failed ${error}`)    
        })

// Middlewares (chay truoc khi xu ly)
app.use(logger('dev')) // dev show so giay hoan thanh cua mot request, run phuong thuc nao v.v
app.use(bodyParser.json())
// Routes
app.get('/', (req, res, next) =>{
    return res.status(200).json({
        message: 'Server is Ok (Update)'
    })
})
app.use('/api/v1', usersRoute)

// Catch 404 Error forward them to error handler
app.use((res, req, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err) // chuyen den ham xu ly
})
// Error handler function // endpoint function error handler // tra loi ra cho client
app.use(( err, req, res, next ) => {
    const error =  app.get('env') === 'development' ? err: {}
    const status = err.status || 500
    
    // response to client error
    res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Starting server listening on port ${port}`))