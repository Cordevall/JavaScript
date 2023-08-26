const {model, Schema} = require('mongoose')

let captureSchema = new Schema ({
    Guild: String,
    Role: String,
    Capture: String
});

module.exports = model("cap", captureSchema);
