const express = require('express');

const router = express.Router();
const UserCtrl = require('../controllers/users');
const AuthHelper = require('../helpers/AuthHelper');

router.get('/users', AuthHelper.VerifyToken, UserCtrl.GetAllUsers);
//tranier
router.post('/trainer', AuthHelper.VerifyToken, UserCtrl.Trainer);
//gymowner
router.post('/gymowner', AuthHelper.VerifyToken, UserCtrl.Gymowner);
router.post('/deleteuser', AuthHelper.VerifyToken, UserCtrl.DeleteUser);
router.get('/user/:id', AuthHelper.VerifyToken, UserCtrl.GetUser);
router.get('/username/:username', AuthHelper.VerifyToken, UserCtrl.GetUserByName);

router.post('/user/view-profile', AuthHelper.VerifyToken, UserCtrl.ProfileView);
router.post('/change-password', AuthHelper.VerifyToken, UserCtrl.ChangePassword);
router.get('/userrole', AuthHelper.VerifyToken, UserCtrl.userrole);
router.get('/getgymowner', AuthHelper.VerifyToken, UserCtrl.GetGymOwner);
router.get('/gettrainer', AuthHelper.VerifyToken, UserCtrl.GetTrainer);

module.exports = router;