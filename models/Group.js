const mongoose = require('mongoose');

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

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
