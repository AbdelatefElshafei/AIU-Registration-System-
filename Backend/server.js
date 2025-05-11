const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const Course = require('./Models/Course');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1);
  });

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

app.post('/api/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (Password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = new User({
      Name,
      Email,
      Password: hashedPassword
    });

    await user.save();
    console.log('User registered successfully:', user.Email);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.Name,
        email: user.Email
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    console.log('User logged in successfully:', user.Email);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.Name,
        email: user.Email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-Password');
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/courses', auth, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Courses error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/api/enroll/:courseId', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const user = await User.findById(req.user._id);
    if (user.enrolledCourses.includes(req.params.courseId)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(req.params.courseId);
    await user.save();

    res.json({ message: "Successfully enrolled in course", course });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/enrolled-courses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('enrolledCourses');
    res.json(user.enrolledCourses);
  } catch (error) {
    console.error("Enrolled courses error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server at http://localhost:${PORT}/test`);
});