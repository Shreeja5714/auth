import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-midleware.js';

const router = express.Router();
//Route level middleware can be added here if needed
router.use('/change-password', authMiddleware);

// Public routes
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// protected routes
router.post('/change-password', UserController.changePassword);


export default router;
