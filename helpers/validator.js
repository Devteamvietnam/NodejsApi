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

const validateBody = (schema) => {
    return (req, res, next) => {
        const validatorResult = schema.validate(req.body)

        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error)
        }else {
             // if error using key value joi
             if (!req.value) req.value = {}  // req.value object empty
             if (!req.value['params']) req.value.params = {}
             req.value.body = validatorResult.value
             next()
        }
    }
}

const schemas = {
    idSchema: Joi.object().keys({
        params: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    bodySchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required()
    }),
    updateBodySchema: Joi.object().keys({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email()
    }),
    decksSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required()
    }),
    newDeckSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    deckOptionalSchema: Joi.object().keys({
        name: Joi.string().min(6),
        description: Joi.string().min(10),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
    }),
}

module.exports = {
    validateParam,
    schemas,
    validateBody
}