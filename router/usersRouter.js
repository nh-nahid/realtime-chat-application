// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const { getUsers, removeUser } = require('../controller/usersController');
const { addUser } = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators");
const {checkLogin} = require("../middlewares/common/checkLogin");

const router = express.Router();

// login page
router.get('/', decorateHtmlResponse('Users'), checkLogin, getUsers);

// Add user
router.post('/', checkLogin, avatarUpload, addUserValidators, addUserValidationHandler, addUser );

// Remove user
router.delete("/:id", removeUser);

module.exports = router;