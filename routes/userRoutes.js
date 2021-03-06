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
// getting role trainers from usersdb
router.get('/gettrainer', AuthHelper.VerifyToken, UserCtrl.GetTrainer);
// getting all Trainers
router.get('/getalltrainer', AuthHelper.VerifyToken, UserCtrl.GetAllTrainers);
// getting one trianer 
router.get('/gettrainerone/:id', AuthHelper.VerifyToken, UserCtrl.GetTrainerOne);
// getting one gym owner
router.get('/getgymownerone/:id', AuthHelper.VerifyToken, UserCtrl.GetGymOwnerOne);
// getting one gym
router.get('/getgymone/:id', AuthHelper.VerifyToken, UserCtrl.GetGymOne);
// gym profile create
router.get('/getgymprofile/:id', AuthHelper.VerifyToken, UserCtrl.GetGymProfile);
router.post('/creategymprofile', AuthHelper.VerifyToken, UserCtrl.CreateGymProfile);
// update gym profile
router.post('/updategymprofile/:id', AuthHelper.VerifyToken, UserCtrl.UpdateGymProfile);
router.post('/finishgym', AuthHelper.VerifyToken, UserCtrl.FinishGym);
router.post('/finishtrainer', AuthHelper.VerifyToken, UserCtrl.FinishTrainer);
// Updating Gym Working Timings
router.post('/updategymworkinghours', AuthHelper.VerifyToken, UserCtrl.UpdateGymWorkingHours);
// Updating Trainer Working Timings
router.post('/updatetrainerworkinghours', AuthHelper.VerifyToken, UserCtrl.UpdateTrainerWorkingHours);
// getting all gyms
router.get('/getallgyms', AuthHelper.VerifyToken, UserCtrl.GetAllGyms);

router.get('/getownergyms', AuthHelper.VerifyToken, UserCtrl.GetOwnerGyms);
// Deleting Gyms
router.post('/deletegym', AuthHelper.VerifyToken, UserCtrl.DeleteGym);
// Updating trainer Profile
router.post('/updatetrainer/:id', AuthHelper.VerifyToken, UserCtrl.UpdateTrainerPofile);
// updating User rpofile
router.post('/updateUser', AuthHelper.VerifyToken, UserCtrl.UpdateUser);
// Adding services
router.post('/addservice', AuthHelper.VerifyToken, UserCtrl.AddServices);
// getting services
router.get('/getservice', AuthHelper.VerifyToken, UserCtrl.GetServices);
router.get('/getpricing', AuthHelper.VerifyToken, UserCtrl.GetPrising);
router.post('/updateprice', AuthHelper.VerifyToken, UserCtrl.UpdatePrice);
router.post('/updatinggymservices', AuthHelper.VerifyToken, UserCtrl.UpdatingGymServices);
router.post('/updatearray', AuthHelper.VerifyToken, UserCtrl.UpdateArray);
router.get('/getareas', AuthHelper.VerifyToken, UserCtrl.GetAreas);
router.get('/getnames', AuthHelper.VerifyToken, UserCtrl.GetNames);






module.exports = router;