const express = require('express');
const userController = require(`./../controllers/userControllers`);

const router = express.Router();

router
    .route('/signUp')   
    .post(userController.signUserUp);


router
    .route('/signIn')
    .post(userController.userSignIn);


module.exports = router;