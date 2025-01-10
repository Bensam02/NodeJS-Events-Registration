import express from "express";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/test", async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    const result = await pool.query(query);
    res.send({ rows: result.rows });
  } catch (error) {
    console.log("DB error : ", { error });
  }
});
export default app;

import express from "express";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/test", async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    const result = await pool.query(query);
    res.send({ rows: result.rows });
  } catch (error) {
    console.log("DB error : ", { error });
  }
});
export default app;
