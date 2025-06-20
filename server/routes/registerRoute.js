// server/routes/registerRoute.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("📦 Incoming data:", req.body); // Debugging line

  const { name, ngoName, email, password, phone, city, state, year } = req.body;

  // Simple field check
  if (!name || !ngoName || !email || !password || !phone || !city || !state || !year) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      name,
      ngoName,
      email,
      password,
      phone,
      city,
      state,
      year
    });

    await newUser.save();
    res.status(201).json({ message: 'Registered successfully!' });
  } catch (err) {
    console.error('❌ Error during registration:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
