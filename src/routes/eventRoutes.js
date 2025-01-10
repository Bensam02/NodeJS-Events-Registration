import express from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  registerEvent,
  updateEvent,
  getRegDetails
} from "../controllers/eventController.js";
import { authenticateToken, checkRole } from "../middlewares/authMiddleware.js";
import { uploadFile } from "../middlewares/eventMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, checkRole, uploadFile, createEvent);
router.get("/:event_id", authenticateToken, getEventById);
router.get("/:event_id/registration-details", authenticateToken, getRegDetails);
router.post("/:event_id/register", authenticateToken, registerEvent);
router.get("/", authenticateToken, getAllEvents);
router.put("/", authenticateToken, checkRole, updateEvent);

export default router;

import express from "express";
import {
  createEvent,
  getEventById,
  getAllEvents,
  registerEvent,
  updateEvent,
  getRegDetails
} from "../controllers/eventController.js";
import { authenticateToken, checkRole } from "../middlewares/authMiddleware.js";
import { uploadFile } from "../middlewares/eventMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, checkRole, uploadFile, createEvent);
router.get("/:event_id", authenticateToken, getEventById);
router.get("/:event_id/registration-details", authenticateToken, getRegDetails);
router.post("/:event_id/register", authenticateToken, registerEvent);
router.get("/", authenticateToken, getAllEvents);
router.put("/", authenticateToken, checkRole, updateEvent);

export default router;
