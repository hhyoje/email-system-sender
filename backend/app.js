const express = require('express');
const bodyParser = require('body-parser');

const homeRoutes = require('./routes/home');
const sequelize = require('./util/database');

const app = express();

//Parse incoming request json data
app.use(bodyParser.json());

//Handle CORS Errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Routes
app.use('/home', homeRoutes);

//Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//Create database if not created, then start server
sequelize.sync().then(result =>{
    app.listen(3000);
}).catch(err => {
    console.log(err);
})