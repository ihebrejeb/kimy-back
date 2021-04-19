const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: String,
    message: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    
},
{ timestamps: true });
const messages = mongoose.model("messages", messageSchema);

module.exports = messages;