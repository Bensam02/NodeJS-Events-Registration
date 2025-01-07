import express from 'express';
import {
  createUser,
  // restOfFunctions, // demo only
} from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/'
  // add restOfFunctions here, // demo only
);
// router.get('/:id', authenticateToken, getUserById);
router.get(
  '/'
  // add restOfFunctions here, // demo only
);

export default router;
