const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const ActivitiesSchema = mongoose.Schema({
    'Name' : String  ,
    'SharedFile' : String , 
    createdAt : {
        type : Date ,
        default : new Date() },
    'Message' : String , 




}); 
const activities = mongoose.model('activities' , ActivitiesSchema) ; 
module.exports = activities;

