const express = require('express');
const router = express.Router();
const controller = require('../controllers/gradeController');
const authorize = require('../middleware/authorize');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 🔒 Grade CRUD – ADMINs and INSTRUCTORS only
router.get('/grade', authorize(['INSTRUCTOR', 'ADMIN']), controller.getAllGrades);
router.get('/grade/:id', authorize(['INSTRUCTOR', 'ADMIN']), controller.getGradeById);
router.post('/grade', authorize(['INSTRUCTOR']), controller.createGrade);
router.put('/grade/:id', authorize(['INSTRUCTOR']), controller.updateGrade);
router.delete('/grade/:id', authorize(['INSTRUCTOR']), controller.deleteGrade);

// 🔒 View student grades – student can only view their own (handled in controller logic or customize middleware)
router.get('/student/:id', authorize(['STUDENT', 'INSTRUCTOR', 'ADMIN']), controller.getGradesByStudent);

// 🔒 Upload routes – INSTRUCTORS only
router.post('/:type', authorize(['INSTRUCTOR']), upload.single('file'), controller.handleUpload);

// 🔓 Public: Grade statistics
router.get('/questions/:courseId', controller.getQuestionKeys);
router.get('/distribution/:courseId', controller.getTotalDistribution);
router.get('/distribution/:courseId/q/:question', controller.getQuestionDistribution);

module.exports = router;
