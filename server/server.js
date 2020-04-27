//configuring the database
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//create express app
const app = express();

app.use(cookieParser());
app.use(bodyParser.json(
    {
        limit :"250000kb"
    })
);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("successfully connnected to database")
}).catch(err =>{
    console.log("can not connect to database due to: "+ err);
    process.exit();
});

// Require Notes routes
require('./route/app.route')(app);

app.listen(8000, () => {
    console.log('Server is listening on the port 8000')
});
