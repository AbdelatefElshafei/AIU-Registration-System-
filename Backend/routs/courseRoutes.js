const express = require('express');
const router = express.Router();
const Course = require('../models/Course');


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const filter = {};
    if (req.query.instructor) filter.instructor = req.query.instructor;
    if (req.query.semester) filter.semester = req.query.semester;
    if (req.query.year) filter.year = req.query.year;

   
    const sort = {};
    if (req.query.sortBy) {
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      sort[req.query.sortBy] = sortOrder;
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'username')
      .populate('prerequisites', 'courseCode title')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(filter);

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username')
      .populate('prerequisites', 'courseCode title')
      .populate('enrolledStudents', 'username');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});


router.post('/:id/enroll', async (req, res) => {
  try {
    const { studentId } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error: error.message });
  }
});


router.post('/:id/drop', async (req, res) => {
  try {
    const { studentId } = req.body;
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }

    course.enrolledStudents = course.enrolledStudents.filter(
      id => id.toString() !== studentId
    );
    await course.save();

    res.json({ message: 'Successfully dropped course' });
  } catch (error) {
    res.status(500).json({ message: 'Error dropping course', error: error.message });
  }
});

module.exports = router; 