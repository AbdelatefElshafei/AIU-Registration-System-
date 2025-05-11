const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[A-Z]{2,3}\d{3}$/, 'Course code must be in format ABC123']
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  semester: {
    type: String,
    enum: ['First Semester', 'Second Semester', 'Summer'],
    required: true
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
    required: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  maxStudents: {
    type: Number,
    required: true,
    min: 1
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  schedule: {
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    }],
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.pre('save', async function(next) {
  if (this.prerequisites && this.prerequisites.length > 0) {
    const prerequisites = await this.model('Course').find({
      _id: { $in: this.prerequisites }
    });
    
    if (prerequisites.length !== this.prerequisites.length) {
      next(new Error('One or more prerequisites are invalid'));
    }
  }
  next();
});

courseSchema.pre('save', async function(next) {
  const instructor = await this.model('User').findById(this.instructor);
  if (!instructor || instructor.role !== 'faculty') {
    next(new Error('Instructor must be a faculty member'));
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema); 