const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://shubhamynr22:fgBPM9WM0IwQWEhW@test.zbrvx2w.mongodb.net/user_app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define a user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create a user model
const User = mongoose.model('User', userSchema);

const app = express();
app.use(express.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user
    const newUser = new User({ name, username, password });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Error creating user' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
