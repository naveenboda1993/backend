const express = require('express');

const router = express.Router();
const ImageCtrl = require('../controllers/images');
const AuthHelper = require('../helpers/AuthHelper');

router.get('/set-default-image/:imgId/:imgVersion', AuthHelper.VerifyToken, ImageCtrl.SetDefaultImage);
router.get('/set-gym-visible-image/:imgId/:imageStatus', AuthHelper.VerifyToken, ImageCtrl.SetGymVisibleImage);
router.post('/upload-image', AuthHelper.VerifyToken, ImageCtrl.UploadImage);
router.post('/upload-gym-gallery', AuthHelper.VerifyToken, ImageCtrl.UploadGalleryImage);
router.post('/upload-documents', AuthHelper.VerifyToken, ImageCtrl.UploadDocuments);


module.exports = router;