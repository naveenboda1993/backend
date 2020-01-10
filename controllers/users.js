const httpStatus = require('http-status-codes');
const User = require('../models/userModels');
const moment = require('moment');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Helpers = require('../helpers/helpers');
const Gym = require('../models/gymModels');
const Trainer = require('../models/trainerModels');


module.exports = {

    async Gymowner(req, res) {
        console.log(req.body);
        const schema = Joi.object().keys({
            username: Joi.string()
                .min(3)
                .max(30)
                .required(),
            phonenumber: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            age: Joi.string()
                .required(),
            address: Joi.string()
                .min(1)
                .max(50)
                .required(),
            language: Joi.string()
                .min(1)
                .max(20)
                .required(),
            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]{3,30}$/).required()
        });


        const { error, value } = schema.validate(req.body);
        // console.log(value);
        if (error && error.details) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ issucess: false, msg: error.details });
        }
        // else{

        //     return res.status(500).json({issucess:true,message:"successfully email validate" });
        // }

        const userEmail = await User.findOne({
            email: Helpers.lowerCase(req.body.email)
        });
        if (userEmail) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: 'Email already exist' });

        }
        const userAge = await User.findOne({
            age: Helpers.lowerCase(req.body.age)
        });
        if (userAge) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: 'age is must' });

        }
        const userAddress = await User.findOne({
            address: Helpers.lowerCase(req.body.address)
        });
        if (userAddress) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: 'address is required' });

        }
        const userLanguage = await User.findOne({
            language: Helpers.lowerCase(req.body.language)
        });
        if (userLanguage) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: 'languages are required' });

        }
        const userName = await User.findOne({
            username: Helpers.firstUppercase(req.body.username)
        });
        if (userName) {
            return res
                .status(httpStatus.CONFLICT)
                .json({ message: 'Username already exist' });

        }
        // const role = await User.findOne({
        //     role: Helpers.firstUppercase(req.body.role)
        // });
        // if (role) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'role must be add' });

        // }
        return bcrypt.hash(value.password, 10, (err, hash) => {
            if (err) {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .json({ message: 'ERROR HASHING PASSWORD' });
            }//if there is any error in password hashing return that error, if not exceute the below
            const body = {
                username: Helpers.firstUppercase(value.username),
                email: Helpers.lowerCase(value.email),
                phonenumber: req.body.phonenumber,
                age: req.body.age,
                address: req.body.address,
                language: req.body.language,
                role: 'gymowner',
                password: hash
            };//new object is created, created all those mentioned 
            User.create(body)//mongoose create method
                .then((
                    //     async user => {
                    //     await user.updateMany({
                    //         _id: req.user._id
                    //     },
                    //         {
                    //             $push: {
                    //                 posts: {
                    //                     postId: post._id,
                    //                     post: req.body.post,
                    //                     created: new Date()
                    //                 }
                    //             }
                    //         }
                    //         );
                    //     res.status(HttpStatus.OK).json({ message: 'Post created', post });
                    // }
                    user) => {
                    res.status(httpStatus.OK).json({ message: 'User created', user });
                    // const token = jwt.sign({data : user}, dbConfig.secret,{
                    //     expiresIn:'9h'
                    // });

                    // res.cookie('auth', token);
                    //     res
                    //     .status(HttpStatus.CREATED)
                    //     .json({message: 'user created successfully', user, token});
                }
                ) //SAVE IN THE DATABASE
                .catch(err => {
                    res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: err });
                });
        });
    },
    async Trainer(req, res) {
        console.log(req.body);
        // const schema = Joi.object().keys({
        //     username: Joi.string()
        //         .min(3)
        //         .max(30)
        //         .required(),
        //     phonenumber: Joi.string().min(3)
        //         .max(30).required(),
        //     email: Joi.string()
        //         .email()
        //         .required(),
        //     age: Joi.string()
        //         .required(),
        //     address: Joi.string()
        //         .min(1)
        //         .max(50)
        //         .required(),
        //     certification: Joi.string()
        //         .required(),
        //     specialization: Joi.string()
        //         .required(),
        //     experience: Joi.string()
        //         .required(),
        //     tagline: Joi.string()
        //         .required(),
        //     id: Joi.string()
        //         .required(),
        //     language: Joi.string()
        //         .required(),
        //     // role: Joi.string().required(),

        //     password: Joi.string()
        //         .pattern(/^[a-zA-Z0-9]{3,30}$/).required()
        // });


        // const { error, value } = schema.validate(req.body);
        // // console.log(value);
        // if (error && error.details) {
        //     return res
        //         .status(httpStatus.BAD_REQUEST)
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
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Email already exist' });

        // }

        // const userName = await User.findOne({
        //     username: Helpers.firstUppercase(req.body.username)
        // });
        // if (userName) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Username already exist' });
        // }
        // const userAge = await User.findOne({
        //     age: Helpers.lowerCase(req.body.age)
        // });
        // if (userAge) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'age is must' });
        // }
        // const userAddress = await User.findOne({
        //     address: Helpers.lowerCase(req.body.address)
        // });
        // if (userAddress) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'address is required' });
        // }
        // const userLanguage = await User.findOne({
        //     language: Helpers.lowerCase(req.body.language)
        // });
        // if (userLanguage) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'languages are required' });
        // }
        // const userCertification = await User.findOne({
        //     certification: Helpers.lowerCase(req.body.certification)
        // });
        // if (userCertification) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Certifications are required' });
        // }
        // const userSpecialization = await User.findOne({
        //     specialization: Helpers.lowerCase(req.body.specialization)
        // });
        // if (userSpecialization) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Specialization are required' });
        // }
        // const userTagline = await User.findOne({
        //     tagline: Helpers.lowerCase(req.body.tagline)
        // });
        // if (userTagline) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Tagline is required' });
        // }
        // const userExperience = await User.findOne({
        //     experience: Helpers.lowerCase(req.body.experience)
        // });
        // if (userExperience) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Experience is required' });
        // }
        // const userId = await User.findOne({
        //     id: Helpers.lowerCase(req.body.id)
        // });
        // if (userId) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'Trainer ID is required' });
        // }
        // const role = await User.findOne({
        //     role: Helpers.firstUppercase(req.body.role)
        // });
        // if (role) {
        //     return res
        //         .status(httpStatus.CONFLICT)
        //         .json({ message: 'role should be add' });

        // }

        return bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .json({ message: 'ERROR HASHING PASSWORD' });
            }//if there is any error in password hashing return that error, if not exceute the below
            const body = {
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                age: req.body.age,
                address: req.body.address,
                // certification: req.body.certification,
                // specialization: req.body.specialization,
                // tagline: req.body.tagline,
                // experience: req.body.experience,                
                language: req.body.language,
                role: 'trainer',
                password: hash
            };//new object is created, created all those mentioned 
            User.create(body)//mongoose create method
                .then((user) => {
                    Trainer.create({
                        certification: req.body.certification,
                        specialization: req.body.specialization,
                        tagline: req.body.tagline,
                        experience: req.body.experience,
                        user: user.id,
                        id: req.body.id,
                    }).then((trainer) => {
                        res.status(httpStatus.OK).json({ message: 'Trainer created', user, trainer });

                    })
                }
                ) //SAVE IN THE DATABASE
                .catch(err => {
                    res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: err });
                });
        });
    },

    async DeleteUser(req, res) {
        // ({_id:req.params})
        console.log(req.body);
        await User.deleteMany({ email: req.body.email })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'Deleted', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },

    async GetAllUsers(req, res) {
        await User.find({})
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .populate('chatList.receiverId')
            .populate('chatList.msgId')
            .populate('notifications.senderId')
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'All users', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },

    async GetUser(req, res) {
        await User.findOne({ _id: req.params.id })
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .populate('chatList.receiverId')
            .populate('chatList.msgId')
            .populate('notifications.senderId')
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'User by id', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },

    async GetUserByName(req, res) {
        await User.findOne({ username: req.params.username })
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .populate('chatList.receiverId')
            .populate('chatList.msgId')
            .populate('notifications.senderId')
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'User by username', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            });
    },

    async ProfileView(req, res) {
        const dateValue = moment().format('YYYY-MM-DD');
        await User.updateMany(
            {
                _id: req.body.id,
                //  'notifications.date':{ $ne: [dateValue,''] },
                //  'notifications.senderId': {$ne: req.user._id}

                'notifications.date': { $ne: dateValue }
            }, {
            $push: {
                notifications: {
                    senderId: req.user._id,
                    message: `${req.user.username} viewed your profile`,
                    created: new Date(),
                    date: dateValue,
                    // viewProfile: true
                }
            }
        }
        ).then((result) => {
            res.status(httpStatus.OK).json({ message: 'Notification send', result });
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
        });
    },
    // updating the users
    async UpdateUser(req, res) {
        console.log(req.body);

        // const body = {
        //     username: req.body.username,
        //     email: req.body.email,
        //     phonenumber: req.body.phonenumber,
        //     user: req.user._id,
        // };
        // console.log(body);

        let result = await User.updateMany(
            {

                _id: req.body._id,

            }, {
            username: req.body.username,
            email: req.body.email,
            phonenumber: req.body.phonenumber
        }
        )
            .then((user) => {
                res.status(httpStatus.OK).json({ message: 'Updated User', user });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    async ChangePassword(req, res) {
        const schema = Joi.object().keys({
            cpassword: Joi.string().required(),
            newPassword: Joi.string()
                .min(5)
                .required(),
            confirmPassword: Joi.string()
                .min(5)
                .optional()
        });
        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.details })
        }

        const user = await User.findOne({ _id: req.user._id });
        return bcrypt.compare(value.cpassword, user.password).then(async (result) => {
            if (!result) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Current password is incorrect' })
            }

            const newpassword = await User.EncryptPassword(req.body.newPassword);
            await User.updateMany({
                _id: req.user._id
            }, {
                password: newpassword
            }
            )
                .then(() => {
                    res.status(httpStatus.OK).json({ message: 'Password changed successfully', result });
                }).catch(err => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
                });
        })



    },
    //getting user role from authtoken
    async userrole(req, res) {
        res.status(httpStatus.OK).json({ role: req.user.role });
    },
    // getting gymownrs
    async GetGymOwner(req, res) {
        await User.find({ role: "gymowner" })
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .populate('chatList.receiverId')
            .populate('chatList.msgId')
            .populate('notifications.senderId')
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'gym owner', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // getting trainers
    async GetTrainer(req, res) {
        await User.find({ role: "trainer" })
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .populate('chatList.receiverId')
            .populate('chatList.msgId')
            .populate('notifications.senderId')
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'trainer', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // creating gyms/ gym profile
    async CreateGymProfile(req, res) {
        console.log(req.body);
        const defaulttimings = [{ id: 1, starting: "10:30 AM", ending: "09:00 PM" }];
        const workinghours = [{ day: 'monday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings }];
        workinghours.push({ day: 'tuesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        workinghours.push({ day: 'wednesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        workinghours.push({ day: 'thursday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        workinghours.push({ day: 'friday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        workinghours.push({ day: 'saturday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        workinghours.push({ day: 'sunday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
        const body = {
            gymname: req.body.gymname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            user: req.user._id,
            gymtag: req.body.tag,
            services: req.body.services,
            gymdec: req.body.discripition,
            address: req.body.address,
            workinghours: workinghours
        };
        // console.log(body);
        Gym.create(body)
            .then((gym) => {
                res.status(httpStatus.OK).json({ message: 'Gym created', gym });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    // updating gyms / gym profiles
    async UpdateGymProfile(req, res) {
        console.log(req.body);

        // const body = {
        //     gymname: req.body.gymname,
        //     email: req.body.email,
        //     phonenumber: req.body.phonenumber,
        //     user: req.user._id,
        // };
        // console.log(body);

        let result = await Gym.updateMany(
            {

                _id: req.body._id,

            }, {
            gymname: req.body.gymname,
            email: req.body.email,
            phonenumber: req.body.phonenumber
        }
        )
            .then((gym) => {
                res.status(httpStatus.OK).json({ message: 'Updated Gym', gym });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    // getting all gyms
    async GetAllGyms(req, res) {
        await Gym.find()
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'All gyms', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // getting  GetOwnerGyms
    async GetGymProfile(req, res) {
        // user: req.user._id,
        await Gym.find({ _id: req.params.id })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'Getting gyms', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // getting  GetOwnerGyms
    async GetOwnerGyms(req, res) {
        // user: req.user._id,
        await Gym.find({ user: req.user._id })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'All gyms', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // getting only one trainer
    async GetTrainerOne(req, res) {
        await User.find({ _id: req.user._id })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'one trainer', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // Deleting Gyms
    async DeleteGym(req, res) {
        // ({_id:req.params})
        console.log(req.body);
        await Gym.deleteMany({ email: req.body.email })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'Deleted', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    // Updating the trainer profile
    async UpdateTrainerPofile(req, res) {
        console.log(req.body);

        // const body = {
        //     email: Helpers.lowerCase(value.email),
        //     phonenumber: req.body.phonenumber,
        //     age: req.body.age,
        //     address: req.body.address,
        //     specialization: req.body.specialization,
        //     tagline: req.body.tagline,
        //     experience: req.body.experience,
        //     user: req.user._id,

        // };
        let result = await Trainer.updateMany(
            {

                _id: req.body._id,

            }, {
            usernam: req.body.username,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            age: req.body.age,
            address: req.body.address,
            specialization: req.body.specialization,
            tagline: req.body.tagline,
            experience: req.body.experience,

        }
        )
            .then((trainer) => {
                res.status(httpStatus.OK).json({ message: 'Updated Trainer', trainer });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    async UpdateGymWorkingHours(req, res) {
        console.log(req.body);

        // console.log(body);
        await Gym.updateMany(
            {
                "workinghours._id": req.body.gym.selectdatevalue._id
            },
            {
                $set:
                {
                    "workinghours.$.duration": req.body.gym.selectdatevalue.duration,
                    "workinghours.$.multiplebookings": req.body.gym.selectdatevalue.multiplebookings,
                    "workinghours.$.numberofbookings": req.body.gym.selectdatevalue.numberofbookings,
                    "workinghours.$.status": req.body.gym.selectdatevalue.status,
                    "workinghours.$.slots": req.body.gym.timings,
                }
            }
        )
            .then((gym) => {
                res.status(httpStatus.OK).json({ message: 'Updated Gym', gym });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
};