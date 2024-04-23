const router = require('express').Router();
const { handleFileUpload } = require('../../helpers/fileUploadHelper');
const Auth = require('../../controllers/admin/auth/AuthController');
const verifyToken = require('../../middleware/admin/authMiddleware');
const Dashboard = require('../../controllers/admin/DashboardController')
const AddUser = require('../../controllers/admin/modules/users/AddUser');

// Authentication routes
router.post('/login', Auth.login);

router.use(verifyToken); // Middleware to verify token
// Dashboard routes
router.get('/dashboard', Dashboard.dashboard);
//add user routes
router.post('/add-user', handleFileUpload.single('image'), AddUser.addUser);

module.exports = router 