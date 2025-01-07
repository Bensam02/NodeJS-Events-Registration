import {
  getUserByIdService,
  // restOfFunctions, // demo only
} from '../services/userService.js';

export const createUser = async (req, res) => {};

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {};
