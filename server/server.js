const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://wink:A1lr8W3HEqrXg4kY@cluster0.ewfuuiz.mongodb.net/DB2';

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); 
  });


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the AIU Registration System API' });
});


app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});