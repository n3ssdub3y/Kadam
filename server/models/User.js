// server/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  ngoName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  city: String,
  state: String,
  year: Number,
});

export default mongoose.models.User || mongoose.model('User', userSchema);

