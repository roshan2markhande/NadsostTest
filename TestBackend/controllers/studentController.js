const Student = require("../models/studentModel");

exports.create = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await Student.createStudent(name, email, age);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { rows, total } = await Student.getStudents(limit, offset);
    res.json({ data: rows, pagination: { total, page, limit } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const student = await Student.getStudentById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(404).json({ error: "Student not found" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await Student.updateStudent(req.params.id, name, email, age);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Student.deleteStudent(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
