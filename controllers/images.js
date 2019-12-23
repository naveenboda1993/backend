
const cloudinary = require('cloudinary');
const HttpStatus = require('http-status-codes');

const User = require('../models/userModels');

cloudinary.config({ 
    cloud_name: 'chatapplication', 
    api_key: '921996545128344', 
    api_secret: 'ZqpfC49RtNHo2VzhkTAljKN6sTk' 
  });


module.exports={
    UploadImage(req, res){
       cloudinary.uploader.upload(req.body.image, async result =>{
        //    console.log(result);

           await User.updateMany(
               {
                   _id: req.user._id
               },
               {
                   $push:{
                       images:{
                           imgId:result.public_id,
                           imgVersion: result.version
                       }
                   }
               }
           ).then(() => res
                        .status(HttpStatus.OK)
                        .json({message: 'Image uploaded successfully'})
                ).catch(err=> res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).
                    json({message : 'Error Occurred while uploading the image'})
                );
       });
    },

    async SetDefaultImage(req,res){
        const{imgId, imgVersion}= req.params;
        await User.updateMany(
            {
                _id: req.user._id
            },
            {
               picId : imgId,
               picVersion : imgVersion
            }
        ).then(() =>
         res
                     .status(HttpStatus.OK)
                     .json({message: 'Default image is set'})
             ).catch(err=> res
                 .status(HttpStatus.INTERNAL_SERVER_ERROR).
                 json({message : 'Error Occurred'})
             );
    }
};