const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')

async function signIn(req, res){

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    let user = new User({
        password: hashPassword,
        email: req.body.email,
    });

    try {
        const saved = await user.save();
        res.status(200).json({user: {email: saved.email, groups: user.groups}});
    } catch (error) {
        console.log(error);
        res.status(400).json("Erreur lors de l'enregistrement de l'utilisateur");
    }
    
}

async function login(req, res){
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(bcrypt.compare(password, user.password)){
            res.status(200).json({user: {email: user.email, groups: user.groups}});
        }
        else
            res.status(400).json("Mauvais mot de passe");

    } catch (error) {
        console.log(error);
        res.status(400).json("Erreur lors de l'authentification");
    }
}

module.exports = {signIn, login};