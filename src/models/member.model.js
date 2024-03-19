const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Member';
const COLLECTION_NAME = 'members';

var memberSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    COLLECTION_NAME: COLLECTION_NAME,
    timestamps: true
}
);

module.exports = model(DOCUMENT_NAME, memberSchema);
