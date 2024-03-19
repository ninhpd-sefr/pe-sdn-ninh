'use strict'
const courseModel = require('../models/course.model');
const memberModel = require('../models/member.model');
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt.helper');

class CourseController {
    getListCourse = async (req, res) => {
        try {
            const listCourse = await courseModel.find().lean();
            res.status(200).json({
                data: listCourse,
            });
        } catch (error) {
            console.log(error)
            res.render('error', {
                message: error.message,
            });
        }
    }

    getDetailCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const course = await courseModel.findById(courseId).lean();
            console.log(`course: `, course)
            console.log(`listSection: `, listSection)
            res.status(200).json({
                data: {
                    course: course,
                    listSection: listSection,
                },
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
            res.status(201).json({
                message: 'Create course successfully',
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    updateCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const data = req.body;
            await courseModel.findByIdAndUpdate(courseId, data);
            res.status(200).json({
                message: 'Update course successfully',
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    deleteCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            await courseModel.findByIdAndDelete(courseId);
            res.status(200).json({
                message: 'Delete course successfully',
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.message,
            });
        }
    }

    loginApi = async (req, res) => {
        try {
            const { username, password } = req.body;
            const member = await memberModel.findOne({
                username: username,
            }).lean();
            if (!member) {
                return res.status(404).json({
                    message: 'Member not found',
                });
            }
            const isValidPassword = await bcrypt.compare(password, member.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    message: 'Password is incorrect',
                });
            }
            const token = await jwt.generateToken(member);

            res.status(200).json({
                token: token,
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = new CourseController();