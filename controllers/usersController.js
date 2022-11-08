const User = require('../models/user');
const { authService } = require('../services');

const login = (req, res) => {

    const {email, username, password} = req.body;

    if(!email && !username){
        return res.status(400).send({message:'Email or username is required'});
    }
    User.findOne({ email: email, username: username }, (error, user) => {
        if(error){
            return res.status(500).send({message: 'Error when trying to find user', error});
        }
        if(!user){
            return res.status(404).send({message: 'User not found', error});
        }
        
        console.log(password, user.password);
        if(!user.comparePassword(password)){
            return res.status(401).send({message: 'Wrong username, email or password', error});
        }else{
            res.status(200).send({token: authService.createToken(user)}); 
        }
    });
}

const register = (req, res) => {
    const {email, username, password} = req.body;
    console.log(req.body);

    if(!email && !username){
        return res.status(400).send({message:'Email or username is required'});
    }
    User.findOne({ email: email, username: username }, (error, user) => {
        if(error){
            return res.status(500).send({message: 'Something went wrong', error});
        }
        if(user){
            return res.status(400).send({message: 'A user is already registred with that username/email', error});
        }
        
        const newUser = new User({email, username, password});
        newUser.save((error) => {
            if(error){
                return res.status(500).send({message: 'Something went wrong', error});
            }
            res.status(200).send({token: authService.createToken(newUser)}); 
        });
    });
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
    login, 
    register,
    deleteUser,
    updateUser
}