const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/auth.middleware')

router.post('/login', CourseController.loginApi);

router.use(authMiddleware.checkLoginApi)

router.get('/', CourseController.getListCourse);

router.get('/:courseId', CourseController.getDetailCourse);

router.post('/', CourseController.createCourse);

router.put('/update/:courseId', CourseController.updateCourse);

router.delete('/delete/:courseId', CourseController.deleteCourse);

module.exports = router;