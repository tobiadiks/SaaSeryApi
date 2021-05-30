var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const softwareSchema = new Schema(
    {
        username:{type:String},
        name:{type:String, unique:true},
        description:{type:String},
        category:{type:String},
        link:{type:String},
        pricing:{type:String},
        type:{type:String}
    },
    {
        timestamps:true
    }
);

const Software = mongoose.model("Software", softwareSchema);

module.exports = Software;