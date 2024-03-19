const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Course';
const COLLECTION_NAME = 'courses';

var courseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true
    }
}, {
    COLLECTION_NAME: COLLECTION_NAME,
    timestamps: true
}
);

module.exports = model(DOCUMENT_NAME, courseSchema);