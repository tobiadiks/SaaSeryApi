var mongoose = require("mongoose");
var passportLocalMongoose= require('passport-local-mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim:true,
            minlength:3
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

    },
    {
        timestamps:true,
    }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);

module.exports = User;