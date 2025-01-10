import jwt from 'jsonwebtoken';
import { isTokenExpired } from '../utils/jwtUtils.js';// in future add more checks for now just check if token is valid, also can check if user exists in db
import {findUserByEmail} from '../db/queries/userQueries.js';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (isTokenExpired(token)) {
      return res.status(401).json({ message: 'Token has expired' });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const checkRole = async (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  try {
    if (!decoded || !decoded.email) {
      return res.status(400).json({ message: 'Invalid token or email not found' });
    }
    
    const email = decoded.email;
    
    const user = await findUserByEmail(email);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();

  } catch (error) {
    console.error('Error in checkRole middleware:', error);
    res.status(500).json({ message: 'Server error' });
  }
};