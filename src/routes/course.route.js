const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.use(authMiddleware.checkIsLogin)

router.get('/', CourseController.getListCourse);

router.get('/:courseId', CourseController.getDetailCourse);

router.post('/', CourseController.createCourse);

router.post('/update/:courseId', CourseController.updateCourse);

router.get('/delete/:courseId', CourseController.deleteCourse);

module.exports = router;