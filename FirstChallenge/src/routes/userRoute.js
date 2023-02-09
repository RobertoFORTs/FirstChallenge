const express = require('express');
const userController = require(`./../controllers/userControllers`);

const router = express.Router();

router
    .route('/signUp')   
    .post(userController.checkUserRegistration, userController.signUserUp); //falta fazer checagem de dados


router
    .route('/signIn')
    .post(userController.checkUserLogin, userController.userSignIn); //falta fazer checagem de dados


module.exports = router;