const User = require('../models/userModels');
module.exports = {
    firstUppercase : (username) =>
     {
         const name = username.toLowerCase();
         return name.charAt(0).toUpperCase() + name.slice(1);
     },
     lowerCase: (str) => {
         return str.toLowerCase();
     },
     number: (str) => {
         return str.toNumber();
     },
     

     updateChatList: async (req,message) =>{
         await User.update({
             _id: req.user._id
         },{
             $pull:{
                 chatList:{
                     receiverId: req.params.receiver_Id
                 }
             }

         });
         await User.update({
            _id: req.params.receiver_Id
        },{
            $pull:{
                chatList:{
                    receiverId: req.user._id
                }
            }

        }
        );

        await User.updateMany(
            {
                _id: req.user._id
            },{
                $push:{
                    chatList:{
                            $each:[
                                {
                                    receiverId: req.params.receiver_Id,
                                    msgId: message._id
                                }
                            ],
                        $position:0
                        }
                    }
                }
            );

           

            await User.updateMany(
                {
                    _id: req.params.receiver_Id
                },{
                    $push:{
                        chatList:{
                            $each: [
                                {
                                    receiverId: req.user._id,
                                    msgId: message._id
                                 }
                             ],
                        $position:0
                        }
                    }
                }
            );
           


     }
};