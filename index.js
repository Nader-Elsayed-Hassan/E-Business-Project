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
app.post("/student", (request, response) => {
  const { name, age, level, address } = request.body;
  if (!parseInt(age)) {
    response.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if(!name || !age || !level || !address) {
    response.status(400).json({
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
  response.status(200).json({
    status: "success",
    data: newStudent,
  });
});

app.post("/student/Database", async (request,response) => {
   const { name, age, level, address } = request.body;
  const newStudent = await Student.create({ name, age, level, address });
  response.status(201).json({
    status: "success",
    data: newStudent,
  });
})
app.get("/student/Database", async (request,response) => {
  const students = await Student.find();
  response.status(200).json({
    status: "success",
    data: students,
  });
})
app.post("/student/hardcoded", (request, response) => {
  const hardcodedStudent = {
    name: "Mona Hassan",
    age: 21,
    level: "Sophomore",
    address: "Giza, Egypt",
  };
  students.push(hardcodedStudent);
  response.status(200).json({
    status: "success",
    data: hardcodedStudent,
  });
});
app.post("/doctor", (request, response) => {
  const { name, age, phone } = request.query;
  if (!parseInt(age)) {
    response.status(400).json({
      status: "error",
      data: "Age is invailed",
    });
    return;
  }
  if (!name || !age || !phone) {
    response.status(400).json({
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
  response.status(200).json({
    status: "success",
    data: newDoctor,
  });
});

app.get("/student", (request, response) => { 
  response.status(200).json({
    status: "success",
    data: students,
  });
});

app.delete("/student", (request, response) => {
  const { name } = request.query;
  const studentIndex = students.findIndex((student) => student.name === name);
  if (studentIndex === -1) {
    response.status(404).json({
      status: "error",
      data: "Student not found",
    });
    return;
  }
  students.splice(studentIndex, 1);
  response.status(200).json({
    status: "success",
    data: "Student deleted successfully",
  });
});
app.patch("/doctor", (request, response) => { 
  const { oldName, newName } = request.query;
  const doctorIndex = doctors.findIndex((doctor) => doctor.name === oldName);
  if (doctorIndex === -1) {
    response.status(404).json({
      status: "error",
      data: "Doctor not found",
    });
    return;
  }
  doctors[doctorIndex].name = newName;
  response.status(200).json({
    status: "success",
    data: doctors[doctorIndex],
  });
});
app.get("/doctorandstudent", (request, response) => { 
  response.status(200).json({
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