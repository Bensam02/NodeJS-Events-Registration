import bcrypt from 'bcryptjs/dist/bcrypt.js';
import pool from '../../config/db.js';

export const createUser = async ({user_name, email, password, phone, role}) => {
  const query =
    'INSERT INTO users (user_name, email, password,phone,role ) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [user_name, email, password, phone, role ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const findAllUsers = async () => {};