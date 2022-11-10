const User = require('../models/user');
const authService = require('./authService');


const signUpUser = (newUser) => {

    
    return new Promise((resolve, reject) => {

        const userCandidate = new User(
            {
                email: newUser.email,
                username: newUser.username,
                password: newUser.password
            }
        );
        const {email, username, password} = userCandidate;

        User.findOne({ email, username }, (error, user) => {
            if(error){
                reject({status: 500, message: 'Something went wrong', error})
            }
            if(user){
                reject({status: 403, message: 'User already exists'})
            }
            console.log(userCandidate);
            userCandidate.save((error) => {
                if(error){
                    reject({status: 500, message: 'Something went wrong'});
                }
                resolve({status: 200, message: 'User created successfully', token: authService.createToken(userCandidate)});
            });
        });
    })
}

const signInUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const userCandidate = new User(
            {
                email: newUser.email,
                username: newUser.username,
                password: newUser.password
            }
        );
        const {email, username, password} = userCandidate;
        
        User.findOne({ email, username }, (error, user) => {
        if(error){
            reject({status: 403, message: 'Error when trying to find user', error}) 
        }
        if(!user){
            reject({status: 403, message: 'User not found'})
        }
        
        if(!user.comparePassword(password)){
            reject({status: 401, message: "Wrong username, email or password"})
        }else{
            resolve({status: 200, message: 'User logged in successfully', token: authService.createToken(userCandidate)});
        }
    });
    })
}

module.exports = {
    signUpUser,
    signInUser
}