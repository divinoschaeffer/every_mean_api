const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    groups: { type: [Schema.Types.ObjectId], default: [] }
});

userSchema.methods.addGroup = function(groupId, session) {
    if (!this.groups.includes(groupId)) {
        this.groups.push(groupId);
        return this.save({session});
    } else {
        return Promise.reject(new Error('Le groupe est déjà ajouté à l\'utilisateur.'));
    }
};

userSchema.methods.removeGroup = function(groupId, session) {
    if (this.groups.includes(groupId)) {
        this.groups.pull(groupId);
        return this.save({session});
    } else {
        return Promise.reject(new Error('Le groupe n\'est pas associé à l\'utilisateur.'));
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;