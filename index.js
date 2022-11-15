const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

// Initial Setup
const { createRoles } = require('./libs/initialSetup');

// Load env vars
dotenv.config();

// Innitialize express
const app = express();
createRoles();

// Middlewares to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
app.use('/api', routes);

//Connect to Server

mongoose.connect(process.env.MONGO_URI || "0.0.0.0", { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    console.log(process.env.MONGO_URI);
    if(error){
        console.log(error);
    } else {
        app.listen(process.env.PORT || 3000, (error) => {
            if(error){
                console.log(error);
            } else {
            console.log(`Server running on port ${process.env.PORT}`);
            }
        });   
    }
});