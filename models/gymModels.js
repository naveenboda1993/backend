const mongoose = require('mongoose');
// const Gym = require('../models/gymModels')



const gymSchema= mongoose.Schema({
    gymname: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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
