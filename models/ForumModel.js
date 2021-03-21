const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({ 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    rate: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                default: 0
            },

        }
    ],
    avg: {
        type: Number,
        default: 0
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }


});


const Forum = mongoose.model("forum", ForumSchema);
module.exports= Forum ;