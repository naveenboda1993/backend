const mongoose = require('mongoose');

const databackupModel = {
    
    createddate: { type: Date, default: Date.now }, 
    loginuser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    oldData: mongoose.Schema.Types.Mixed, 
    newData: mongoose.Schema.Types.Mixed, 
    dbtable: mongoose.Schema.Types.Mixed, 
    where: mongoose.Schema.Types.Mixed, 
   
    
}
const databcpSchema = mongoose.Schema(databackupModel);


module.exports = mongoose.model('Databackup', databcpSchema);