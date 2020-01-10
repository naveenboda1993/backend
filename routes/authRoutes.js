const express = require('express');
const router = express.Router(); //express router, once we create the route we cannt export the  router from this file


//creating require files
const AuthCtrl = require('../controllers/auth.js');


//for authentication
// router.get('/testing', AuthCtrl.Testing);
 //cu is method which will be in auth
router.post('/register', AuthCtrl.CreateUser); //cu is method which will be in auth
router.post('/login', AuthCtrl.LoginUser);


router.get('/getgyms', AuthCtrl.GetGyms);

module.exports= router;
