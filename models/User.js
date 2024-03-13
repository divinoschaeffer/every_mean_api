const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    groups: { type: [Schema.Types.ObjectId], default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;