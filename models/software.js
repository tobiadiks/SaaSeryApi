var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const softwareSchema = new Schema(
    {
        username:{type:String},
        name:{type:String},
        description:{type:String},
        link:{type:String},
        pricing:{type:String}
    },
    {
        timestamps:true
    }
);

const Software = mongoose.model("Software", softwareSchema);

module.exports = Software;