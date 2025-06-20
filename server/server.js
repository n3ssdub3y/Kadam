// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import registerRoute from './routes/registerRoute.js';

dotenv.config();

const app = express();

// ✅ MIDDLEWARE - required to parse JSON
app.use(cors());
app.use(express.json()); // <-- REQUIRED

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

app.use('/api/register', registerRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
