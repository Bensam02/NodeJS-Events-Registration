import express from "express";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";
import db from './db/orm/models/index.js'

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/db-sync", async (req, res) => {
  try {
    await db.sequelize.sync({ alter: true})
    res.status(200).json({ message: 'Database synced successfully' });
  } catch (error) {
    console.error('Error syncing database:', error);
    res.status(500).json({ error: 'Failed to sync database' });
  }
});
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