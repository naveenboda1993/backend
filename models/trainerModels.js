const mongoose = require('mongoose');

const trainerModel = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    certification: { type: String, default: '' },
    specialization: { type: String, default: '' },
    tagline: { type: String, default: '' },    
    experience: { type: String, default: '' },    
    languages: { type: String, default: '' },    
    age: { type: String, default: '' },    
    address: { type: String, default: '' },    
    id: { type: String, default: '' },    
    images: [
        {
            imgId: { type: String, default: '' },
            imgVersion: { type: String, default: '' }
        }
    ],
}
const trainerSchema = mongoose.Schema(trainerModel);


module.exports = mongoose.model('Trainer', trainerSchema);