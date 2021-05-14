var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const softwareSchema = new Schema(
    {
        username:{type:String, required:true},
        name:{type:String, required:true},
        description:{type:String, required: true},
    },
    {
        timestamps:true
    }
);

const Software = mongoose.model("Software", softwareSchema);

module.exports = Software;