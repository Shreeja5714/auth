import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-midleware.js';

const router = express.Router();
//Route level middleware can be added here if needed
router.use('/change-password', authMiddleware);
router.use('/user-details', authMiddleware);

// Public routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/send-reset-password-email', UserController.sendPasswordResetEmail);
router.post('/reset-password/:id/:token', UserController.resetPassword);

// protected routes
router.post('/change-password', UserController.changePassword);
router.get('/user-details', UserController.getUserDetails);


export default router;
