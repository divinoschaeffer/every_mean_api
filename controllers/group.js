const Group = require("../models/Group");
const User =require('../models/User');
const { startSession } = require('mongoose');

async function createGroup(req, res){
    const {predecessor} = req.body;
    const newGroup = new Group(req.body);

    let session;
    try {
        session = await startSession();
        session.startTransaction();

        const savedGroup = await newGroup.save({ session });

        if(savedGroup.level === 0){
            const user = await User.findById(savedGroup.owner).session(session);
            await user.addGroup(savedGroup, session);
        }
        else {
            const predGroup = await Group.findById(predecessor).session(session);
            if(predGroup)
                await predGroup.addGroup(savedGroup._id, session);
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ group: savedGroup });
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la création du groupe avec prédécesseur.' });
    }
}

async function deleteGroup(req, res){
    const id = req.params.id;
    
    let session;
    try {
        session = await startSession();
        session.startTransaction();

        const delGroup = await Group.findById(id).session(session);

        if(delGroup && delGroup.level !== 0){
            const predGroup = await Group.findById(delGroup.predecessor).session(session);
            await predGroup.removeGroup(delGroup._id, session);
            predGroup.groups.pull(delGroup._id);
            await predGroup.save({session});
        }
        else if(delGroup.level === 0){
            const user = await User.findById(delGroup.owner).session(session);
            await Group.removeGroup(delGroup._id, session);
            await user.removeGroup(delGroup._id, session);
        }

        await session.commitTransaction();
        session.endSession();
        
        res.status(200).json({message: "Suppression du groupe avec succès"});
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du group.' });
    }
}

async function getGroup(req, res){
    const id = req.params.id;

    try {
        const group = await Group.findById(id);
        if (group)
            res.status(200).json({group:  group});
        else
            res.status(400).json({message: "Aucun groupe avec cet identifiant n'a été trouvé"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Erreur lors de la récupération du groupe"});
    }
}

module.exports = {createGroup, getGroup, deleteGroup};