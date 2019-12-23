const express = require('express');
const router = express.Router(); //express router, once we create the route we cannt export the  router from this file


//creating require files
const PostCtrl = require('../controllers/posts.js');
const AuthHelper = require('../helpers/AuthHelper')


//for authentication
router.get('/posts', AuthHelper.VerifyToken, PostCtrl.GetAllPosts);
router.get('/post/:id', AuthHelper.VerifyToken, PostCtrl.GetPost);


 //cu is method which will be in auth
router.post('/post/add-post', AuthHelper.VerifyToken, PostCtrl.AddPost); //cu is method which will be in auth

router.post('/post/add-like', AuthHelper.VerifyToken, PostCtrl.AddLike);

router.post('/post/add-comment', AuthHelper.VerifyToken, PostCtrl.AddComment);


module.exports= router;
