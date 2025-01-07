import {
  comparePassword,
  createUser,
  findUserByEmail,
  findUserById,
} from "../db/queries/userQueries.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwtUtils.js";
import db from "../db/orm/models/index.js";

export const createUserService = async (userData) => {
  try {
    // Check if the user already exists
    const isAlreadyExistsUser = await db.User.findOne({ where: { email: userData.email } });
    if (isAlreadyExistsUser) {
      return { status: 400, message: "Email Already Exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Create the user
    const user = await db.User.create(userData);
    return {
      status: 201,
      message: `${user.user_name}, You have Successfully Registered`,
    };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while creating the user" };
  }
};

export const checkLoginService = async (email, password) => {
  try {
    // Find the user by email
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return { status: 404, message: "User Not Found" };
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 401, message: "Invalid Password" };
    }

    // Generate the JWT token
    const jwtToken = await generateToken(user.userId, user.email, user.role);
    return { status: 200, message: `Welcome back, ${user.userName}!`, token: jwtToken };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while logging in" };
  }
};

export const getUserByIdService = async (id) => {
  try {
    // Find the user by ID
    const user = await db.User.findByPk(id);
    if (!user) {
      return { status: 404, message: "User Not Found" };
    }
    return { status: 200, data: user };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while fetching the user" };
  }
};

export const getAllUsersService = async () => {
  try {
    // Find all users
    const users = await db.User.findAll();
    return { status: 200, data: users };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while fetching users" };
  }
};

