const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({ 
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    courses : {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    title: {
        type: String,
        required: true

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
    like : {
        type : Number,
        default : 0
    },

    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            size: {
                type: Number
            }
        }
    ],
    comments: [
        {
            commenter: {
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