const { Router } = require('express');
const authController = require('../controllers/userController');

const router = Router();

// router.get('/signup', authController.signup_get);
//this one
router.post('/signup', authController.signup_post);
//this one
router.post('/login', authController.login_post);
//this one
router.get('/logout', authController.logout_get);
//this one
router.get('/getalluser', authController.get_all_users);

module.exports = router;