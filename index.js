const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/studentModel.js")
const app = express();
app.use(express.json());
const uri = "mongodb+srv://Avengers:Avengers123456789@cluster0.vel7nep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri).catch((e) => {
  console.log(e);
})

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

app.post("/student/Database", async (req,res) => {
   const { name, age, level, address } = req.body;
  const newStudent = await Student.create({ name, age, level, address });
  res.status(201).json({
    status: "success",
    data: newStudent,
  });
})
app.get("/student/Database", async (req,res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    data: students,
  });
})
app.post("/student/hardcoded", (req, res) => {
  const hardcodedStudent = {
    name: "Mona Hassan",
    age: 21,
    level: "Sophomore",
    address: "Giza, Egypt",
  };
  students.push(hardcodedStudent);
  res.status(200).json({
    status: "success",
    data: hardcodedStudent,
  });
});
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
function listenFunction() {
  console.log("server is listening on port 8080");
}
app.listen(8080, listenFunction());

// node index.js