const router = require('express').Router();
const { handleFileUpload } = require('../../helpers/fileUploadHelper');
const Auth = require('../../controllers/admin/auth/AuthController');
const verifyToken = require('../../middleware/admin/authMiddleware');
const Dashboard = require('../../controllers/admin/DashboardController')
const User = require('../../controllers/admin/modules/users/UserController');
const Institution = require('../../controllers/admin/modules/institution/InstitutionController');

// Authentication routes
router.post('/login', Auth.login);

router.use(verifyToken); // Middleware to verify token
// Dashboard routes
router.get('/dashboard', Dashboard.dashboard);
// User routes
router.post('/add-user', handleFileUpload.single('image'), User.addUser);
router.get('/users', User.getUsers);
router.post('/update-user/:id', handleFileUpload.single('image'), User.updateUser);
// Institution routes
router.post('/add-institution', Institution.addInstitution);
router.get('/boards', Institution.getInstitutions);
router.post('/update-institution/:id', Institution.updateInstitutions);

module.exports = router 