const mongoose = require("mongoose");

const StudentModel = new mongoose.Schema({
    name: String,
    age: Number,
    level: String,
    address:String
})
const Student = mongoose.model("Student", StudentModel);
module.exports = Student