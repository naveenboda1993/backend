const mongoose = require('mongoose');
// const Gym = require('../models/gymModels')



const gymSchema= mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    gymname: {type: String},
    gymdec: {type: String,default:''},
    gymtag: {type: String,default:''},
    services: {type: String},
    gymcategory: {type: String},
    address: {type: String},
    email: {type: String},
    phonenumber:{type:Number},
    picVersion:{type: String, default :'1569647029'},
    picId:{type: String, default:'default-profile-1_auxokg.png'},
    images:[
        {
        imgId:{type: String, default:''},
        imgVersion:{type: String, default:''}
        }
    ], 
});

module.exports = mongoose.model('Gym', gymSchema);
