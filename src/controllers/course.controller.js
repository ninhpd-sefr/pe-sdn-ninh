'use strict'
const courseModel = require('../models/course.model');
const sectionModel = require('../models/section.model');
class CourseController {
    getListCourse = async (req, res) => {
        try {
            const listCourse = await courseModel.find().lean();
            console.log(listCourse)
            res.render('course', {
                listCourse: listCourse,
            });
        } catch (error) {
            res.render('error', {
                message: error.message,
            });
        }
    }

    getDetailCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const course = await courseModel.findById(courseId).lean();
            const listSection = await sectionModel.find({ course: courseId }).lean();
            console.log(`course: `, course)
            console.log(`listSection: `, listSection)
            res.render('courseDetail', {
                course: course,
                listSection: listSection,
            });
        } catch (error) {
            console.log(error)
            res.render('error', {
                message: error.message,
            });
        }
    }

    createCourse = async (req, res) => {
        try {
            const data = req.body;
            await courseModel.create(data);
            res.redirect('/course');
        } catch (error) {
            console.log(error)
            res.render('error', {
                message: error.message,
            });
        }
    }

    updateCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const data = req.body;
            await courseModel.findByIdAndUpdate(courseId, data);
            res.redirect('/course');
        } catch (error) {
            console.log(error)
            res.render('error', {
                message: error.message,
            });
        }
    }

    deleteCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            await courseModel.findByIdAndDelete(courseId);
            res.redirect('/course');
        } catch (error) {
            console.log(error)
            res.render('error', {
                message: error.message,
            });
        }
    }
}

module.exports = new CourseController();