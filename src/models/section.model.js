const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Section';
const COLLECTION_NAME = 'sections';

const sectionSchema = new Schema({
    sectionName: {
        type: String,
        require: true,
    },
    sectionDescription: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        require: true,
    },
    isMainTask: {
        type: Boolean,
        require: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        require: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

module.exports = model(DOCUMENT_NAME, sectionSchema);