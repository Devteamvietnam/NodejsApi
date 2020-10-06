const express = require('express')
// logger
const logger = require('morgan')

const usersRoute = require('./routes/user')

const app = express()

// Middlewares (chay truoc khi xu ly)
app.use(logger('dev')) // dev show so giay hoan thanh cua mot request, run phuong thuc nao v.v

// Routes
app.get('/', (req, res, next) =>{
    return res.status(200).json({
        message: 'Server is Ok (Update)'
    })
})
app.use('/api/v1', usersRoute)

// Catch 404 Error forward them to error handler
app.use((res, req, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error) // chuyen den ham xu ly
})
// Error handler function // endpoint function error handler // tra loi ra cho client
app.use(() => {
    const error =  app.get('env') === 'development' ? error: {}
    const status = error.status || 500
    
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