const httpStatus = require('http-status-codes');
const User = require('../models/userModels');
const moment = require('moment');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Helpers = require('../helpers/helpers');
const Gym = require('../models/gymModels');
const Trainer = require('../models/trainerModels');
const Service = require('../models/serviceModels');
const Pricing = require('../models/pricingModels');
const DbBackup = require('../models/databackupModels');
const ArraysStates = require('../models/statescityareaModels');


module.exports = {

    async Gymowner(req, res) {
        console.log("Gym creation start");
        console.log(req.body);
        // const schema = Joi.object().keys({
        //     username: Joi.string()
        //         .min(3)
        //         .max(30)
        //         .required(),
        //     phonenumber: Joi.string()
        //         .min(3)
        //         .max(30)
        //         .required(),
        //     email: Joi.string()
        //         .email()
        //         .required(),
        //     age: Joi.string()
        //         .required(),
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
        return bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .json({ message: 'ERROR HASHING PASSWORD' });
            }//if there is any error in password hashing return that error, if not exceute the below
            console.log("Gym hash start");

            const body = {
                username: req.body.username,
                email: Helpers.lowerCase(req.body.email),
                phonenumber: req.body.phonenumber,
                age: req.body.age,
                address: '',
                role: 'gymowner',
                password: hash
            };//new object is created, created all those mentioned 
            console.log("Gym hash body");
            User.create(body)//mongoose create method
                .then((
                    gymOwneruser) => {
                    console.log(gymOwneruser);
                    const defaulttimings = [{ id: 1, starting: "10:30 AM", ending: "09:00 PM" }];
                    const workinghours = [{ day: 'monday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings }];
                    workinghours.push({ day: 'tuesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    workinghours.push({ day: 'wednesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    workinghours.push({ day: 'thursday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    workinghours.push({ day: 'friday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    workinghours.push({ day: 'saturday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    workinghours.push({ day: 'sunday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
                    const gymbody = {
                        email: req.body.email,
                        ownername: req.body.ownername,
                        gymname: req.body.gymname,
                        phonenumber: req.body.phonenumber,
                        officenumber: req.body.officenumber,
                        user: gymOwneruser._id,
                        gymtag: req.body.tag,
                        services: [],
                        gymdec: req.body.discripition,
                        flatno: req.body.flatno,
                        street: req.body.street,
                        area: req.body.area,
                        locality: req.body.locality,
                        city: req.body.city,
                        pincode: req.body.pincode,
                        state: req.body.state,
                        workinghours: workinghours,
                        // accountnumber: req.body.accountnumber,
                        // bankname: req.body.bankname,
                        // ifsccode: req.body.ifsccode,
                        // holdername: req.body.holdername,
                        gst: req.body.gst,
                        timings: req.body.timings
                    };
                    // console.log(body);
                    Gym.create(gymbody)
                        .then((gym) => {
                            Pricing.create({ user: gymOwneruser._id, gym: gym._id }).then((pricing) => {

                                res.status(httpStatus.OK).json({ message: 'Gym created', gym, gymid: gym._id });
                            }).catch(err => {
                                res
                                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                                    .json({ message: err, path: "pricing create" });
                            });
                        }
                        )
                        .catch(err => {
                            res
                                .status(httpStatus.INTERNAL_SERVER_ERROR)
                                .json({ message: err, path: "gym create" });
                        });

                    // res.status(httpStatus.OK).json({ message: 'User created', user: gymOwneruser });
                }
                ).catch(err => {
                    res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: err, path: "user create" });
                }); //SAVE IN THE DATABASE
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
            const defaulttimings = [{ id: 1, starting: "10:30 AM", ending: "09:00 PM" }];
            const workinghours = [{ day: 'monday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings }];
            workinghours.push({ day: 'tuesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            workinghours.push({ day: 'wednesday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            workinghours.push({ day: 'thursday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            workinghours.push({ day: 'friday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            workinghours.push({ day: 'saturday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            workinghours.push({ day: 'sunday', duration: '10', multiplebookings: 'Yes', numberofbookings: 10, status: 'Enable', slots: defaulttimings });
            const defaultnames = [{ id: '', name: '' }]; 
            const documents = [{ docId: '', docName: 'Aadhaar Card' }, { docId: '', docName: 'Fitness Certification ' }, { docId: '', docName: 'Higher Study Certificate' }, { docId: '', docName: 'Pan Card' }, { docId: '', docName: 'Driving Licence' }];
            const body = {
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                officenumber: req.body.officenumber,
                age: req.body.age,
                address: req.body.address,
                language: req.body.language,
                role: 'trainer',
                password: hash
            };//new object is created, created all those mentioned 
            User.create(body)//mongoose create method
                .then((userResult) => {
                    Trainer.create({
                        surname: req.body.surname,
                        name: req.body.name,
                        dob: req.body.dob,
                        certification: req.body.certification,
                        specialization: req.body.specialization,
                        tagline: req.body.tagline,
                        experience: req.body.experience,
                        languages: req.body.language,
                        accountnumber: req.body.accountnumber,
                        bankname: req.body.bankname,
                        ifsccode: req.body.ifsccode,
                        holdername: req.body.holdername,
                        age: req.body.age,
                        workinghours: workinghours,
                        documents:documents,
                        flatno: req.body.flatno,
                        street: req.body.street,
                        area: req.body.area,
                        locality: req.body.locality,
                        city: req.body.city,
                        pincode: req.body.pincode,
                        state: req.body.state,
                        user: userResult._id,
                        id: req.body.id,
                    }).then((trainer) => {
                        res.status(httpStatus.OK).json({ message: 'Trainer created', user: userResult, trainer,trainerid:userResult._id });

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

        await user.findOne({ _id: req.body._id }).than((OldData) => {
            DbBackup.create({
                oldData: OldData,
                loginuser: req.user,
                newData: req.body,
                dbtable: 'user',
                where: {
                    _id: req.body._id,
                }
            });
            // const body = {
            //     username: req.body.username,
            //     email: req.body.email,
            //     phonenumber: req.body.phonenumber,
            //     user: req.user._id,
            // };
            // console.log(body);

            User.updateMany(
                {

                    _id: req.body._id,

                }, {
                username: req.body.username,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                address: req.body.address,
                age: req.body.age
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
    // getting all trainers
    async GetAllTrainers(req, res) {
        await Trainer.find()
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'All Trainers', result });
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
            ownername: req.body.ownername,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            officenumber: req.body.officenumber,
            user: req.user._id,
            gymtag: req.body.tag,
            services: req.body.services,
            gymdec: req.body.discripition,
            flatno: req.body.flatno,
            street: req.body.street,
            area: req.body.area,
            locality: req.body.locality,
            city: req.body.city,
            pincode: req.body.pincode,
            state: req.body.state,
            workinghours: workinghours,
            accountnumber: req.body.accountnumber,
            bankname: req.body.bankname,
            ifsccode: req.body.ifsccode,
            holdername: req.body.holdername,
            gst: req.body.gst,
            timings: req.body.timings
        };
        // console.log(body);
        Gym.create(body)
            .then((gym) => {
                Pricing.create({ user: req.user._id, gym: gym._id }).then((pricing) => {

                    res.status(httpStatus.OK).json({ message: 'Gym created', gym, pricing });
                }).catch(err => {
                    res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ message: err });
                });
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
        await gym.findOne({ _id: req.params.id, }).than((oldData) => {
            DbBackup.create({
                oldData: OldData,
                loginuser: req.user,
                newData: req.body,
                dbtable: 'gym',
                where: {
                    _id: req.body.data.gymid,
                }
            });
            // const body = {
            //     gymname: req.body.gymname,
            //     email: req.body.email,
            //     phonenumber: req.body.phonenumber,
            //     user: req.user._id,
            // };
            // console.log(body);

            Gym.updateMany(
                {

                    _id: req.params.id,

                }, {
                gymname: req.body.gymname,
                ownernme: req.body.ownername,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                gymdec: req.body.gymdec,
                gymtag: req.body.gymtag,
                officenumber: req.body.officenumber,
                accountnumber: req.body.accountnumber,
                bankname: req.body.bankname,
                ifsccode: req.body.ifsccode,
                holdername: req.body.holdername,
                flatno: req.body.flatno,
                street: req.body.street,
                area: req.body.area,
                locality: req.body.locality,
                city: req.body.city,
                pincode: req.body.pincode,
                state: req.body.state,
                gst: req.body.gst,
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
        });

    },
    // updating gyms / gym profiles
    async FinishGym(req, res) {
        console.log(req.body);


        Gym.updateMany(
            {

                _id: req.body.id,

            }, {
            terms: "agree"
        }
        )
            .then((gym) => {
                res.status(httpStatus.OK).json({ message: 'Finish Gym', gym });
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
        if (req.user.role == 'admin') {
            await Gym.find()
                .then((result) => {
                    res.status(httpStatus.OK).json({ message: 'All Admin gyms', result });
                }).catch(err => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
                })
        } else {
            await Gym.find({ user: req.user._id })
                .then((result) => {
                    res.status(httpStatus.OK).json({ message: 'All gyms', result });
                }).catch(err => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
                })
        }

    },
    // getting only one trainer
    async GetTrainerOne(req, res) {
        await User.findOne({ _id: req.params.id })
            .then((user) => {
                Trainer.findOne({ user: req.params.id })
                    .then((tranier) => {
                        res.status(httpStatus.OK).json({ message: 'one trainer', user, tranier });
                    }).catch(err => {
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error1 Occurred' });
                    })
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })

    },
    // getting only one gym
    async GetGymOne(req, res) {
        await Gym.findOne({ _id: req.params.id })
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'one gym', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })

    },

    async GetGymOwnerOne(req, res) {
        await User.findOne({ _id: req.params.id })
            .then((user) => {
                res.status(httpStatus.OK).json({ message: 'one gymowner', user });
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
        await User.findOne({ _id: req.params.id }).then((userData) => {
            Trainer.findOne({ user: req.params.id }).then((trainerData) => {
                DbBackup.create({
                    oldData: { user: userData, trainer: trainerData },
                    loginuser: req.user,
                    newData: req.body,
                    dbtable: 'trainer , user',
                    where: {
                        userId: req.params.id, trainerId: req.params.id,
                    }
                });
            });

            Trainer.updateMany(
                {
                    user: req.params.id,

                },
                {
                    // username: req.body.username,
                    // email: req.body.email,
                    // phonenumber: req.body.phonenumber,
                    // age: req.body.trainer.age,
                    // address: req.body.tranier.address,
                    surname: req.body.tranier.surname,
                    name: req.body.tranier.name,
                    dob: req.body.tranier.dob,
                    flatno: req.body.tranier.flatno,
                    street: req.body.tranier.street,
                    area: req.body.tranier.area,
                    locality: req.body.tranier.locality,
                    city: req.body.tranier.city,
                    pincode: req.body.tranier.pincode,
                    state: req.body.tranier.state,
                    specialization: req.body.tranier.specialization,
                    certification: req.body.tranier.certification,
                    tagline: req.body.tranier.tagline,
                    experience: req.body.tranier.experience,
                    languages: req.body.tranier.languages,
                }
            )
            User.updateMany(
                {
                    _id: req.params.id,

                },
                {
                    username: req.body.user.username,
                    email: req.body.user.email,
                    phonenumber: req.body.user.phonenumber,
                    officenumber: req.body.user.officenumber,
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


        }
        ).catch(err => {
            console.log(err);
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
    async UpdateTrainerWorkingHours(req, res) {
        console.log(req.body);

        // console.log(body);
        await Trainer.updateMany(
            {
                "workinghours._id": req.body.trainer.selectdatevalue._id
            },
            {
                $set:
                {
                    "workinghours.$.duration": req.body.trainer.selectdatevalue.duration,
                    "workinghours.$.multiplebookings": req.body.trainer.selectdatevalue.multiplebookings,
                    "workinghours.$.numberofbookings": req.body.trainer.selectdatevalue.numberofbookings,
                    "workinghours.$.status": req.body.trainer.selectdatevalue.status,
                    "workinghours.$.slots": req.body.trainer.timings,
                }
            }
        )
            .then((trainer) => {
                res.status(httpStatus.OK).json({ message: 'Updated trainer', trainer });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    async AddServices(req, res) {
        console.log(req.body);
        const body = {
            name: req.body.servicename,
            servicedec: req.body.servicedec,
            servicecode: req.body.servicecode,
            status: req.body.status
        };
        Service.create(body)
            .then((service) => {
                res.status(httpStatus.OK).json({ message: 'Services added', service });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            });
    },
    async GetServices(req, res) {
        await Service.find()
            .then((result) => {
                res.status(httpStatus.OK).json({ message: 'All Services', result });
            }).catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    async GetPrising(req, res) {
        if (req.user.role == 'admin') {
            await Pricing.find()
                .then((result) => {
                    res.status(httpStatus.OK).json({ message: 'All Pricing', result: result, role: req.user.role });
                }).catch(err => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
                })
        } else {
            await Pricing.find({ user: req.user._id })
                .then((result) => {
                    res.status(httpStatus.OK).json({ message: 'All Pricing', result: result, role: req.user.role });
                }).catch(err => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
                })
        }

    },
    async UpdatePrice(req, res) {
        console.log(req.body);
        await Pricing.findOne({ _id: req.body._id }).then((OldData) => {
            DbBackup.create({
                oldData: OldData,
                loginuser: req.user,
                newData: req.body,
                dbtable: 'pricing',
                where: {
                    _id: req.body._id,
                }
            });
            Pricing.updateMany(
                {

                    _id: req.body._id,

                }, {
                isvip: req.body.isvip,
                isbudget: req.body.isbudget,
                ispremium: req.body.ispremium,
                onemonth: req.body.onemonth,
                twomonth: req.body.twomonth,
                threemonth: req.body.threemonth,
                sixmonth: req.body.sixmonth,
                twelvemonth: req.body.twelvemonth,
                twofourmonth: req.body.twofourmonth,
                servicesprices: req.body.servicesprices
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

        });

    },
    async UpdatingGymServices(req, res) {

        console.log(req.body);
        await Gym.findOne({ _id: req.body.data.gymid }).then((OldData) => {
            let adding = req.body.data.services.filter(item => OldData.services.map(function (e) { return e._id; }).indexOf(item._id) < 0);
            let missing = OldData.services.filter(item => req.body.data.services.map(function (e) { return e.name; }).indexOf(item.name) < 0);
            if (adding.length > 0) {
                console.log(adding);
                adding.forEach(element => {
                    Pricing.updateMany(
                        {
                            gym: req.body.data.gymid,
                        }, {
                        $push: {
                            servicesprices: {
                                service: element,
                                servicename: element.name
                            }
                        }
                    }
                    ).then((pricing1) => {
                        console.log(pricing1);
                    }
                    )
                        .catch(err => {
                            console.log(err);

                        });
                });

            }
            if (missing.length > 0) {
                console.log(missing);
                missing.forEach(element => {
                    Pricing.updateMany(
                        {
                            gym: req.body.data.gymid,
                        }, {
                        $pull: {
                            servicesprices: {
                                service: element._id
                            }
                        }
                    }
                    ).then((pricing1) => {
                        console.log(pricing1);
                    }
                    )
                        .catch(err => {
                            console.log(err);

                        });
                });

            }

            DbBackup.create({
                oldData: OldData,
                loginuser: req.user,
                newData: req.body,
                dbtable: 'gym',
                where: {
                    _id: req.body.data.gymid,
                }
            });
            Gym.updateMany(
                {

                    _id: req.body.data.gymid,

                }, {
                services: req.body.data.services
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

        });



    },
    // Updating Sates, Cities and areas
    async UpdateArray(req, res) {
        console.log(req.body);
        // const defalutareas = [{ id: 1, name: 'Your Area', cities: 'Your City', states: 'Your State' }];// const areas = [{ name: '', cities: '', states: '', }];
        // cities = [{ name: '', states: '', }];
        // states = [{ name: '' }];
        const defalutareas = { states: [{ name: 'Telagana' }, { name: 'Andra pradesh' }, { name: 'Arunachal Pradesh' }, { name: 'Assam' }, { name: 'Bihar' }, { name: 'Chhattisgarh' }, { name: 'Goa' }, { name: 'Gujarat' }, { name: 'Haryana' }, { name: 'Himachal Pradesh' }, { name: 'Jammu and Kashmir' }, { name: 'Jharkhand' }, { name: 'Karnataka' }, { name: 'Kerala' }, { name: 'Madya Pradesh' }, { name: 'Maharashtra' }, { name: 'Manipur' }, { name: 'Meghalaya' }, { name: 'Mizoram' }, { name: 'Nagaland' }, { name: 'Orissa' }, { name: 'Punjab' }, { name: 'Rajasthan' }, { name: 'Sikkim' }, { name: 'Tamil Nadu' }, { name: 'Tripura' }, { name: 'Uttaranchal' }, { name: 'Kolkata' }, { name: 'West Bengal' }, { name: 'Uttar Pradesh' }] };
        req.body.areas.forEach(element => {
            console.log(element);
        });
        await ArraysStates.updateMany(
            { "_id": "5e36b2f20e112a4a909256f1" },
            {
                $push: {
                    // states: {
                    //     name: req.body.states.name,
                    // },
                    // cities: { 
                    //     name: req.body.cities.name,
                    //     state: req.body.cities.state,
                    // },
                    areas: req.body.areas
                }
                // $set:
                // {
                //     "states.$.name": req.body.states.name,
                //     "cities.$.name": req.body.cities.name,
                //     "cities.$.state": req.body.cities.state,
                //     "areas.$.name": req.body.areas.name,
                //     "areas.$.city": req.body.areas.city,
                //     "areas.$.state": req.body.areas.state,
                // }
            }).then((arrays) => {
                res.status(httpStatus.OK).json({ message: 'Updated state', arrays });
            }
            )
            .catch(err => {
                res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: err });
            })

    },
    async GetAreas(req, res) {
        await ArraysStates.findOne().then((areas) => {
            res.status(httpStatus.OK).json({ message: 'all areas', areas });
        })
            .catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
    async GetNames(req, res) {
        await trainer.findOne().then((names) => {
            res.status(httpStatus.OK).json({ message: 'Upload Documents names', names });
        })
            .catch(err => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occurred' });
            })
    },
}