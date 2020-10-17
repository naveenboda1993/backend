const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModels');
const Gym = require('../models/gymModels');
const Helpers = require('../helpers/helpers');
const dbConfig = require('../config/secret');

module.exports = {
    // InfinitySpark(req,res){
    //     console.log("HAPPY PROGRAMMERS DAY");
    // },
    async CreateUser(req, res) {
        console.log(req.body);
        return res
            .status(HttpStatus.CONFLICT)
            .json({ data: req.body, message: 'Email already exist' });

        // const schema = Joi.object().keys({
        //     username: Joi.string()
        //         .min(3)
        //         .max(30)
        //         .required(),
        //     email: Joi.string()
        //         .email()
        //         .required(),
        //     role: Joi.string()
        //         .min(3)
        //         .max(30)
        //         .required(),
        //     phonenumber: Joi.string().min(3)
        //         .max(30).required(),
        //     password: Joi.string()
        //         .pattern(/^[a-zA-Z0-9]{3,30}$/).required()
        // });


        // const { error, value } = schema.validate(req.body);
        // // console.log(value);
        // if (error && error.details) {
        //     return res
        //         .status(HttpStatus.BAD_REQUEST)
        //         .json({ issucess: false, msg: error.details });
        // }
        // else{

        //     return res.status(500).json({issucess:true,message:"successfully email validate" });
        // }

        // const userEmail = await User.findOne({
        //     email: Helpers.lowerCase(req.body.email)
        // });
        // if (userEmail) {
        //     return res
        //         .status(HttpStatus.CONFLICT)
        //         .json({ message: 'Email already exist' });

        // }

        // const userName = await User.findOne({
        //     username: Helpers.firstUppercase(req.body.username)
        // });
        // if (userName) {
        //     return res
        //         .status(HttpStatus.CONFLICT)
        //         .json({ message: 'Username already exist' });

        // }

        // return bcrypt.hash(value.password, 10, (err, hash) => {
        //     if (err) {
        //         return res
        //             .status(HttpStatus.BAD_REQUEST)
        //             .json({ message: 'ERROR HASHING PASSWORD' });
        //     }//if there is any error in password hashing return that error, if not exceute the below
        //     const body = {
        //         username: Helpers.firstUppercase(value.username),
        //         email: Helpers.lowerCase(value.email),
        //         phonenumber:req.body.phonenumber,
        //         role: req.body.role,
        //         password: hash
        //     };//new object is created, created all those mentioned 
        //     User.create(body)//mongoose create method
        //         .then((user) => {
        //             const token = jwt.sign({ data: user }, dbConfig.secret, {
        //                 expiresIn: '9h'
        //             });//user object
        //             res.cookie('auth', token);
        //             res
        //                 .status(HttpStatus.CREATED)
        //                 .json({ message: 'user created successfully', user, token });
        //         }) //SAVE IN THE DATABASE
        //         .catch(err => {
        //             res
        //                 .status(HttpStatus.INTERNAL_SERVER_ERROR)
        //                 .json({ message: err });
        //         });
        // });

    },
    async LoginUser(req, res) {
        if (!req.body.username || !req.body.password) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'No empty fields allowed' });
        }
        await User.findOne({ username: req.body.username }).then(user => {
            if (!user) {
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: 'username is not found' });
            }
            return bcrypt.compare(req.body.password, user.password).then(result => {
                if (!result) {
                    return res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: 'Password is not matched' });
                }
                const token = jwt.sign({ data: user }, dbConfig.secret, {
                    expiresIn: '9h'
                });
                res.cookie('auth', token);
                return res
                    .status(HttpStatus.OK)
                    .json({ message: 'Login successful', user, token });
            });
        })
            .catch(err => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured' });
            })

    },
    async GetGyms(req, res) {
        await Gym.find()
            .then((result) => {
                res.status(HttpStatus.OK).json({ message: 'gyms', result });
            }).catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    }
};