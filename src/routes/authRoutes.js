import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateUser } from '../validations/userValidationSchema.js';

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', login);

export default router;