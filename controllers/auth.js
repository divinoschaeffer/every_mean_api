const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const JWT = require('jsonwebtoken');


function generateToken(){
    const secretKey = process.env.SECRET_KEY;
    const options = {
        expiresIn: '24h'
    };
    return JWT.sign({}, secretKey, options);
}

async function signIn(req, res){

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    let user = new User({
        password: hashPassword,
        email: req.body.email,
    });

    try {
        const saved = await user.save();
        const token = generateToken();
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict' });
        res.status(200).json({user: {_id: user._id, email: saved.email, groups: user.groups}});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Erreur lors de l'enregistrement de l'utilisateur"});
    }
    
}

async function login(req, res){
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(bcrypt.compare(password, user.password)){
            const token = generateToken();
            res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'strict'});
            res.status(200).json({user: {_id: user.id, email: user.email, groups: user.groups}});
        }
        else
            res.status(400).json("Mauvais mot de passe");

    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Erreur lors de l'authentification"});
    }
}

module.exports = {signIn, login};