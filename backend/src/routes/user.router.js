const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const jwtHelper = require('../middlewares/jwtHelper');
const multer = require("../config/multer");

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, userController.userProfile);
router.get('/:id', jwtHelper.verifyJwtToken, userController.getUser);
router.post('/user/image', jwtHelper.verifyJwtToken, multer.single('file'), userController.uploadImage);

module.exports = router;