const router = require('express').Router();
const verifyToken = require('../../middleware/user/authMiddleware');
const Auth = require('../../controllers/user/auth/AuthController');
const Dashboard = require('../../controllers/user/DashboardController')

// Authentication routes
router.post('/login', Auth.login);
router.post('/otp-check', Auth.otpCheck);

// Dashboard routes
router.get('/dashboard', verifyToken,Dashboard.dashboard);

module.exports = router
