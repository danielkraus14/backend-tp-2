const { validationResult } = require('express-validator');
const { authService, userService } = require('../services');

const signUpUser = async (req, res) => {
    try{
        console.log(req.body);
        const resulValidationReq = validationResult(req);
        const isValidReq = resulValidationReq.isEmpty();
        
        if(!isValidReq){
            return res.status(400).send({message: 'Invalid request', error: resulValidationReq.array()});
        }
        const { username, password, email, role } = req.body;
        const result = await userService.signUpUser( email, username, password, role );
        const token = authService.createToken(result);
        res.status(201).send(token);
    }catch(error){
        res.status(400).send(error);
    }
};

const signInUser = async (req, res) => {
    let result;
    try{
        const resulValidationReq = validationResult(req);
        const isValidReq = resulValidationReq.isEmpty();

        if(!isValidReq){
            return res.status(400).send({message: 'Invalid request', error: resulValidationReq.array()});
        }
    
        const { email, username, password} = req.body;
        result =  await userService.signInUser(email, username, password).catch(
            error => {
                return res.status(error.status).send({message: error.message});
            }
        )
        const token = authService.createToken(result);
        res.status(200).send(token);
    }catch(error){
        res.status(400).send(error);
    }
};

const getUserById = async (req, res) => {
    try{
        const { userId } = req.params;
        const result = await userService.getUserById(userId);
        res.status(200).send(result);
    }catch(error){
        res.status(error.status).send({message: error.message});
    }
};

const deleteUser = async (req, res) => {
    let result;
    try{
        const { userId } = req.params;
        result = await userService.deleteUser(userId);
        res.status(200).send({message: 'User deleted', user: result});
    }catch(error){
        res.status(400).send(error);
    }
};

const updateUser = async (req, res) => {
    let result;
    try{
        const { userId } = req.params;
        const { username, password, email, role } = req.body;
        result = await userService.updateUser(userId, username, password, email, role);
        res.status(200).send({message: 'User updated', user: result});
    }catch(error){
        res.status(400).send(error);
    }
}


module.exports = {
    signUpUser,
    signInUser,
    getUserById,
    deleteUser,
    updateUser
}