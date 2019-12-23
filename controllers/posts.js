const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const Post = require('../models/postModels');
const user = require('../models/userModels');
const cloudinary = require('cloudinary');
const moment = require('moment');
const request = require('request');

cloudinary.config({ 
    cloud_name: 'chatapplication', 
    api_key: '921996545128344', 
    api_secret: 'ZqpfC49RtNHo2VzhkTAljKN6sTk' 
  });

module.exports = {
    AddPost(req, res) {
        const schema = Joi.object().keys({
            post: Joi.string().required(),
            // image: Joi.string().optional()
        });
       const body = {
           post: req.body.post
       }
       const { error } = schema.validate( body);
       if (error && error.details) {
           return res
           .status(HttpStatus.BAD_REQUEST)
           .json({ msg: error.details });
           
        }
        const bodyObj = {
            user: req.user._id,
            username: req.user.username,
            post: req.body.post,
            created: new Date()
        };


        if(req.body.post && !req.body.image){
        console.log("3");
            Post.create(bodyObj)
            .then(async post => {
                await user.updateMany({
                    _id: req.user._id
                },
                    {
                        $push: {
                            posts: {
                                postId: post._id,
                                post: req.body.post,
                                created: new Date()
                            }
                        }
                    }
                    );
                res.status(HttpStatus.OK).json({ message: 'Post created', post });
            })
            .catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured' });
            });
        }

        if(req.body.post && req.body.image){
        cloudinary.uploader.upload(req.body.image, async result =>{
            const reqBody = {
                user: req.user._id,
                username: req.user.username,
                post: req.body.post,
                imgId: result.public_id,
                imgVersion: result.version,
                created: new Date()
            };
            Post.create(reqBody)
            .then(async (post) => {
                await user.updateMany(
                    {
                    _id: req.user._id
                },
                    {
                        $push: {
                            posts: {
                                postId: post._id,
                                post: req.body.post,
                                created: new Date()
                            }
                        }
                    }
                    );
                res.status(HttpStatus.OK).json({ message: 'Post and Image created', post });
            }).catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured' });
            });

        })



       
    }
},
    async GetAllPosts(req, res) {
        try {

            const today = moment().startOf('day');
            const tomorrow = moment(today).add(1, 'days');

            const posts = await Post.find({
                // created:{$gte: today.toDate(), $lt: tomorrow.toDate()}
            })
                .populate('user')
                .sort({ created: -1 });

                const top = await Post.find({
                    totalLikes: {$gte : 2}, 
                    //  created:{$gte: today.toDate(), $lt: tomorrow.toDate()}
                    })
                .populate('user')
                .sort({ created: -1 });
                console.log(req.user.role);

                const User = await user.findOne({_id: req.user._id});
                if(User.city=== '' && User.country===''){
                    request('https://geoip-db.com/json/',{json: true}, async(err, res, body)=>{
                    await user.updateMany({
                        _id: req.user._id
                    },{
                        city: body.city,
                        country:body.country_name
                    })
                    }
                    );
                }

            return res.status(HttpStatus.OK).json({ message: 'All posts', posts, top });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred' });

        }
    },
    async AddLike(req, res){
        const postId = req.body._id;
        await Post.updateMany({
            _id: postId,
            'likes.username':{$ne:req.user.username}
        },{
            $push:{ likes: {
             username: req.user.username   
            }},
            $inc : {totalLikes :1},
        })
        .then(() => {
            res.status(HttpStatus.OK).json({message : 'You Liked the post'});
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : 'Error Occurred'});

        });
    },

    async AddComment(req, res){
        // console.log(req.body);

        const postId = req.body.postId;
        await Post.updateMany(
            {
            _id: postId
           
        },{
            $push:{ 
                comments: {
                    userId : req.user._id,
             username: req.user.username,
             comment : req.body.comment,
             createdAt :new Date() 
                }
            }
        }
        // res.status(HttpStatus.OK).json({message :  req.body});
        
        )       
        .then(() => {
            // res.status(HttpStatus.OK).json({message : 'Comment added to the post'});
            res.status(HttpStatus.OK).json({message : req.body});
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message : 'Error Occurred'});

        })
    },

async GetPost(req, res){
await Post.findOne({_id: req.params.id})
.populate('user')
.populate('comments.userId')
.then(post => {
    res.status(HttpStatus.OK).json({message: 'post found', post});
})
.catch(err =>
    res
    .status(HttpStatus.NOT_FOUND)
    .json({message : 'Post not found', post})
    );
}
};