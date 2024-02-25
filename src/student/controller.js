const pool = require("../../db");
const query = require("./queries");

const getStudents = (req, res) => {
  pool.query(query.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(query.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  // check if email exists
  pool.query(query.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    }
    // add student in db
    pool.query(query.addStudent, [name, email, age, dob], (error, results) => {
      if (error) throw error;
      res.status(201).send("student created successfully");
    });
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(query.getStudentById, [id], (error, results) => {
    const studentNotFound = !results.rows.length;
    if (studentNotFound) {
      res.send("student does not exist");
    }

    pool.query(query.deleteStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("student removed successfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const { name } = req.body;

  pool.query(query.getStudentById, [id], (error, results) => {
    const studentNotFound = !results.rows.length;
    if (studentNotFound) {
      res.send("student does not exist");
    }
    pool.query(query.updateStudent, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("student updated successfully");
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
