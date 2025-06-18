const pool = require("../db");

exports.createStudent = async (name, email, age) => {
  const res = await pool.query(
    "INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age]
  );
  return res.rows[0];
};

exports.getStudents = async (limit, offset) => {
  const data = await pool.query(
    "SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  const total = await pool.query("SELECT COUNT(*) FROM students");
  return { rows: data.rows, total: parseInt(total.rows[0].count) };
};

exports.getStudentById = async (id) => {
  const student = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
  const marks = await pool.query("SELECT * FROM marks WHERE student_id = $1", [id]);
  return { ...student.rows[0], marks: marks.rows };
};

exports.updateStudent = async (id, name, email, age) => {
  const res = await pool.query(
    "UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
    [name, email, age, id]
  );
  return res.rows[0];
};

exports.deleteStudent = async (id) => {
  await pool.query("DELETE FROM marks WHERE student_id = $1", [id]);
  await pool.query("DELETE FROM students WHERE id = $1", [id]);
};
