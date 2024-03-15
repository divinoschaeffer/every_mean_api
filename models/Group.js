const mongoose = require('mongoose');
const { startSession } = require('mongoose');

const { Schema } = mongoose;

const gradeSchema = new Schema({
    name: { type: String, default: "" },
    mark: { type: Number, default: -1 },
    coefficient: { type: Number, default: 1 }
});

const groupSchema = new Schema({
    name: { type: String, default: "" },
    marks: { type: [gradeSchema], default: [] },
    coefficient: { type: Number, default: 1 },
    groups: { type: [Schema.Types.ObjectId], default: [] },
    predecessor: { type: String, default: "" },
    level: { type: Number, required: true },
    owner: { type: String, required: true }
});

groupSchema.methods.addGrade = function(gradeData) {
    this.marks.push(gradeData);
    return this.save();
};

groupSchema.methods.removeGrade = function(gradeId) {
    const index = this.marks.findIndex(grade => grade._id === gradeId);
    if (index !== -1) {
        this.marks.splice(index, 1);
        return this.save();
    } else {
        return Promise.reject(new Error('La note spécifiée n\'existe pas dans ce groupe.'));
    }
};

groupSchema.methods.addGroup = function(groupId, session) {
    if (!this.groups.includes(groupId)) {
        this.groups.push(groupId);
        return this.save({session});
    } else {
        return Promise.reject(new Error('Le groupe est déjà ajouté au groupe.'));
    }
};

const removeGroupAndChildren = async (groupId, session) => {
    const group = await Group.findById(groupId).session(session);
    if (!group) {
        return;
    }

    for (const childId of group.groups) {
        await removeGroupAndChildren(childId, session);
    }

    await Group.findByIdAndDelete(group._id).session(session);
};

groupSchema.statics.removeGroup = async function(groupId, session) {
    try {
        await removeGroupAndChildren(groupId, session);

        console.log('Groupe et ses enfants supprimés avec succès.');
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.error('Erreur lors de la suppression du groupe et de ses enfants:', error);
    }
};


const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
