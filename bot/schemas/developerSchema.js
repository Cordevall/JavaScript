const {model, Schema} = require('mongoose')

let developerSchema= new Schema ({
    DeveloperID: String,
    DeveloperTag: String,
    Timestamp: String,
    Content: Array 
    
});

module.exports = model("dev", developerSchema,);