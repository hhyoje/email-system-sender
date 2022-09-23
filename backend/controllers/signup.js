const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const Entry = require('../models/entry');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: ''
    }
}));

module.exports.postSignUp = (req, res, next) => {
    console.log('Data has been posted from frontend.');
    //If request data did not pass validation checks, throw an error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error();
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    //Create an Entry from request data and add it to the database
    const email = req.body.email;
    const name = req.body.name;
    Entry.create({
        email: email,
        name: name
    }).then(result => {
        console.log('Data has been added to the database.')
        res.status(200).json({
            message: "Success!",
            data: "Data has been added to the database."
        });
        //Send an email using SendGrid
        return transporter.sendMail({
            to: email,
            from: 'danielslee777@gmail.com',
            subject: 'Sign Up Confirmation',
            html: '<p>Hello ' + String(name) + ', we are confirming your email ' + String(email) + '. Thank you for signing up.</p>'
        });
    }).catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}