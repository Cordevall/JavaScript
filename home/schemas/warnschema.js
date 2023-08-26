const {model, Schema} = require('mongoose')

let warningschema = new Schema ({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

module.exports = model("warn", warningschema);