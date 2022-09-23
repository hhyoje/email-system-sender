const express = require('express');
const { check } = require('express-validator');

const Entry = require('../models/entry');

const homeController = require('../controllers/signup');

const router = express.Router();

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return Entry.findAll({where: {email: value}}).then(entry => {
                if(entry.length !== 0) {
                    return Promise.reject('Email already exists.');
                }
            })
        }),
    check('name')
        .not().isEmpty()
        .withMessage('Please enter a name.')
    ], 
    homeController.postSignUp);

module.exports = router;