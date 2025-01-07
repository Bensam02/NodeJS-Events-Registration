import Joi from "joi";
import { validate } from "./validationConfig.js";

const userSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10),
  role: Joi.string().valid("admin", "user").required(),
});

export const validateUser = validate(userSchema);
