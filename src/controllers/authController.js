import {
  checkLoginService,
  createUserService,
} from "../services/userService.js";
export const register = async (req, res) => {
  try {
    const createUser = await createUserService(req.body);
    res.status(200).json(createUser);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const event = await checkLoginService(req.body.email, req.body.password);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
