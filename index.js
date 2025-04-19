const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res, _next) => {
  res.status(200).json({
    status: "success",
    data: "Hello to the base page",
  });
});
const doctors = [
  {
    name: "Dr. Sarah Ahmed",
    age: 45,
    phone: "01012345678",
  },
  {
    name: "Dr. Omar Khaled",
    age: 38,
    phone: "01198765432",
  },
  {
    name: "Dr. Nour Hassan",
    age: 50,
    phone: "01234567890",
  },
];
const students = [
  {
    name: "Ali Mahmoud",
    age: 20,
    level: "Undergraduate",
    address: "Cairo, Egypt",
  },
  {
    name: "Salma Adel",
    age: 22,
    level: "Graduate",
    address: "Alexandria, Egypt",
  },
  {
    name: "Youssef Tarek",
    age: 19,
    level: "Freshman",
    address: "Ismailia, Egypt",
  },
];

app.post("/doctor", (req, res) => {
  const { name, age, phone } = req.query;
  if (!parseInt(age)) {
    res.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if (!name || !age || !phone) {
    res.status(400).json({
      status: "error",
      date: "You must fill all data",
    });
    return;
  }
  const newDoctor = {
    name,
    age,
    phone,
  };
  doctors.push(newDoctor);
  res.status(200).json({
    status: "success",
    data: newDoctor,
  });
});

app.get("/student", (req, res) => { 
  res.status(200).json({
    status: "success",
    data: students,
  });
});

app.post("/student", (req, res) => {
  const { name, age, level, address } = req.body;
  if (!parseInt(age)) {
    res.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if(!name || !age || !level || !address) {
    res.status(400).json({
      status: "error",
      date: "You must fill all data",
    });
    return;
  }
  const newStudent = {
    name,
    age,
    level,
    address,
  };
  students.push(newStudent);
  res.status(200).json({
    status: "success",
    data: newStudent,
  });
});
app.delete("/student", (req, res) => {
  const { name } = req.query;
  const studentIndex = students.findIndex((student) => student.name === name);
  if (studentIndex === -1) {
    res.status(404).json({
      status: "error",
      data: "Student not found",
    });
    return;
  }
  students.splice(studentIndex, 1);
  res.status(200).json({
    status: "success",
    data: "Student deleted successfully",
  });
});
app.patch("/doctor", (req, res) => { 
  const { oldName, newName } = req.query;
  const doctorIndex = doctors.findIndex((doctor) => doctor.name === oldName);
  if (doctorIndex === -1) {
    res.status(404).json({
      status: "error",
      data: "Doctor not found",
    });
    return;
  }
  doctors[doctorIndex].name = newName;
  res.status(200).json({
    status: "success",
    data: doctors[doctorIndex],
  });
});
app.get("/doctorandstudent", (req, res) => { 
  res.status(200).json({
    status: "success",
    data: {
      doctors,
      students,
    },
  });
});
app.get("/doctor", (req, res) => { 
  res.status(200).json({
    status: "success",
    data: doctors,
  });
});
function listenFunction() {
  console.log("server is listening on port 803");
}
app.listen(8080, listenFunction());