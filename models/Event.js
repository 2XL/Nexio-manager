var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    id: {
        type: String,
        index: {
            unique: true
        }
    }, // this will be considered primary key
    received_at: String,
    generated_at: String,
    // display_received_at: String,
    source_id: String,
    source_name: String,
    source_ip: String,
    program: String,
    // hostname: String,
    facility: String,
    //
    severity: String,
    message: String,
});

module.exports = mongoose.model('Event', eventSchema);
