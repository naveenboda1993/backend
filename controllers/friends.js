const HttpStatus = require('http-status-codes')
const User =  require('../models/userModels');

module.exports = {
    FollowUser(req, res){
        const followUser = async() => {
            await User.updateMany(
                {
                    _id: req.user._id,
                    'following.userFollowed':{$ne : req.body.userFollowed}
                },
                {
                $push: {
                    following:{
                        userFollowed: req.body.userFollowed
                            }
                        }
                }
            );


            await User.updateMany(
                {
                    _id: req.body.userFollowed,
                    'following.follower':{$ne : req.body.userFollowed}
                },
                {
                $push: {
                    followers:{
                        follower: req.user._id
                            },
                        notifications : {
                            senderId: req.user._id,
                            message:`${req.user.username} is now following you`,
                            created: new Date(),
                            viewProfile: false,

                        }
                        }
                }
            );
        }

        followUser()
        .then(() => {
            res.status(HttpStatus.OK).json({message:'Following user now'})
        })
        .catch(err => {
            res.status(HttpStatus.OK).json({message:'Error Occurred'})
        });
    },


    UnFollowUser(req, res){
        const unFollowUser = async() => {
            await User.updateMany(
                {
                    _id: req.user._id,
                    
                },
                {
                $pull: {
                    following:{
                        userFollowed: req.body.userFollowed
                            }
                        }
                }
            );


            await User.updateMany(
                {
                    _id: req.body.userFollowed,
                    
                },
                {
                $pull: {
                    followers:{
                        follower: req.user._id
                            }
                        }
                }
            );
        }

        unFollowUser()
        .then(() => {
            res.status(HttpStatus.OK).json({message:'Following user now'})
        })
        .catch(err => {
            res.status(HttpStatus.OK).json({message:'Error Occurred'})
        });
    },
  async  MarkNotification(req, res){
        if(!req.body.deleteValue){
            await User.updateOne({
                _id: req.user._id,
                'notifications._id': req.params.id
            },{
                $set:{'notifications.$.read': true}
            }
            ).then(() => {
                res.status(HttpStatus.OK).json({message:'Mark as read'});
            })
            .catch(err =>{
                res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:'Error Occurred'});
            });
        }
        else{
            await User.updateOne({
                _id: req.user._id,
                'notifications._id': req.params.id
            },{
                $pull:{
                    notifications:{_id:req.params.id}
                }
            }).then(() => {
                res.status(HttpStatus.OK).json({message:'Deleted Successfully'});
            })
            .catch(err =>{
                res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message:'Error Occurred'});
            });
        }
       
    },
    async MarkAllNotifications(req, res){
        await User.updateMany({
            _id: req.user._id
        },{
            $set:{'notifications.$[elem].read': true}
        },
        {arrayFilters:[{'elem.read': false}], multi: true}
        )
        .then(() => {
            res.status(HttpStatus.OK).json({message:'Marked ALL Successfully'});
        })
        .catch(err =>{
            res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message:'Error Occurred'});
        });
    }
};