const Joi = require('@hapi/joi')
// middleware 
const validateParam = (schema, name) => {
    return (req, res, next) => {
        console.log('params', req.params[name])
        const validatorResult = schema.validate({params: req.params[name]})
        if (validatorResult.error) {
           return res.status(400).json(validatorResult.error)
        } else {
            // if error using key value joi
            console.log('1', req.value)
            if (!req.value) req.value = {}  // req.value object empty
            console.log('2', req.value.params)
            if (!req.value['params']) req.value.params = {}
            console.log('3', req.value)
            req.value.params[name] = req.params[name]
            console.log('req value', req.value)
            next() // to controller not get params 
        }
    }
}
const schemas = {
    idSchema: Joi.object().keys({
        params: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
}

module.exports = {
    validateParam,
    schemas
}