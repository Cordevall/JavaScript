const {model, Schema} = require('mongoose')


const limitSchema = new Schema({
    Server: String,
    Message: String,
})

module.export = model ("limit", limitSchema)
