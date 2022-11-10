const User = require('../models/user');
const { authService, userService } = require('../services');
const { validationResult } = require('express-validator');

const signInUser = async (req, res) => {
    try{
        const resulValidationReq = validationResult(req);
        const isValidReq = resulValidationReq.isEmpty();
        const {email, username, password} = req.body;

        if(!isValidReq){
            return res.status(400).send({message: 'Invalid request', error: resulValidationReq.array()});
        }
        
        const userRegistered =  await userService.signInUser(req.body).catch(error => {
            return res.status(error.status).send({message: error.message});
    });
    res.status(userRegistered.status).send({message: userRegistered.message, token: userRegistered.token});
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }   

}

const signUpUser = async (req, res) => {
    try{
        const resulValidationReq = validationResult(req);
        const isValidReq = resulValidationReq.isEmpty();

        if(!isValidReq){
            return res.status(400).send({message: 'Invalid request', error: resulValidationReq.array()});
        }
    
        const userRegistered =  await userService.signUpUser(req.body).catch(
            error => {
                return res.status(error.status).send({message: error.message});
            }
        )
        res.status(userRegistered.status).send({message: userRegistered.message ,token: userRegistered.token});
        }
        catch(error){
            res.status(500).send({message: 'Something went wrong', error});
        }
}

const deleteUser = (req, res) => {
    const {id} = req.body;
    User.findByIdAndDelete(id, (error, user) => {
        if(error){
            return res.status(500).send({message: 'Something went wrong', error});
        }
        if(!user){
            return res.status(404).send({message: 'User not found', error});
        }
        res.status(200).send({message: 'User deleted successfully'});
    });
};

const updateUser = async (req, res) => {
    const {_id} = req.body;
    User.findByIdAndUpdate(_id, req.body, {new: true}, (error, user) => {
        if(error){
            return res.status(500).send({message: 'Something went wrong', error});
        }
        if(!user){
            return res.status(404).send({message: 'User not found', error});
        }
        res.status(200).send({token: authService.createToken(user)});
    });
}

module.exports = {
    signInUser, 
    signUpUser,
    deleteUser,
    updateUser
}