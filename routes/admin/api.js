const router = require('express').Router();
const { handleFileUpload } = require('../../helpers/fileUploadHelper');
const Auth = require('../../controllers/admin/auth/AuthController');
const verifyToken = require('../../middleware/admin/authMiddleware');
const Dashboard = require('../../controllers/admin/DashboardController')
const AddUser = require('../../controllers/admin/modules/users/AddUser');
const QuestionTypes = require('../../controllers/admin/modules/questionTypes/QuestionTypesController');
const QuestionBank = require('../../controllers/admin/modules/questionBank/QuestionBankController');

// Authentication routes
router.post('/login', Auth.login);

router.use(verifyToken); // Middleware to verify token
// Dashboard routes
router.get('/dashboard', Dashboard.dashboard);
//add user routes
router.post('/add-user', handleFileUpload.single('image'), AddUser.addUser);
// question type routes
router.post('/add-question-type', QuestionTypes.addQuestionTypes);
router.get('/question-types', QuestionTypes.getQuestionTypes);
router.post('/edit-question-type/:id', QuestionTypes.editQuestionTypes);
router.delete('/delete-question-type/:id', QuestionTypes.deleteQuestionTypes);

// Question Bank routes
router.post('/add-question', QuestionBank.addQuestion);

module.exports = router 