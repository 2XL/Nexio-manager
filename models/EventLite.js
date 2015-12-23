var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    idx: {
        type: String,
        index: {
            unique: true
        }
    }, // this will be considered primary key
    // received_at: String,
    generated_at: String,

    // display_received_at: String,
    //source_id: String,
    //source_name: String,
    source_ip: String,
    program: String,
    // hostname: String,
    facility: String,
    //
    //severity: String,
    // message: String,
    module: String,
});

module.exports = mongoose.model('xxxes', eventSchema);
