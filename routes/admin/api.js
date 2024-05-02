const router = require('express').Router();
const Auth = require('../../controllers/admin/auth/AuthController');
const verifyToken = require('../../middleware/admin/authMiddleware');
const Dashboard = require('../../controllers/admin/DashboardController')
const User = require('../../controllers/admin/modules/users/UserController');
const Institution = require('../../controllers/admin/modules/institution/InstitutionController');
const Exam = require('../../controllers/admin/modules/exams/ExamController');
const ExamDetails = require('../../controllers/admin/modules/exams/ExamDetailsController');

// Authentication routes
router.post('/login', Auth.login);

router.use(verifyToken); // Middleware to verify token
// Dashboard routes
router.get('/dashboard', Dashboard.dashboard);
// User routes
router.post('/add-user', User.addUser);
router.get('/users', User.getUsers);
router.post('/update-user/:id', User.updateUser);
// Institution routes
router.post('/add-institution', Institution.addInstitution);
router.get('/boards', Institution.getInstitutions);
router.post('/update-institution/:id', Institution.updateInstitutions);
// Exam routes
router.post('/add-exam', Exam.addExam);
router.get('/exams', Exam.getExams);
router.post('/update-exam/:id', Exam.updateExams);
// Exam Details routes
router.post('/add-exam-details', ExamDetails.addExamDetails);

module.exports = router 