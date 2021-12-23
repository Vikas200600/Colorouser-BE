const mockStudentData = require("../data/studentData");

let studentData = mockStudentData.studentData;

let groupController = require("./groupController");

let getStudents = (_req, res) => {
  res.json({ status: "success", data: studentData });
};

let getStudent = (req, res) => {
  res.json({ status: "success", data: studentData[req.params.id] });
};

let addStudent = (req, res) => {
  console.log("adding student....");
  console.log(...studentData["keys"]);
  let newId = (Math.max(...studentData["keys"]) + 1).toString();
  console.log(newId);
  newStudentDetails = {
    ...req.body,
    id: newId,
    profile: null,
  };
  console.log(newStudentDetails);
  studentData[newId] = newStudentDetails;
  studentData["keys"].push(newId);
  groupController.addStudentToGroup(newStudentDetails);
  console.log("student added");
  res.json({ status: "success", data: newStudentDetails });
};

let editStudent = (req, res) => {
  studentData[req.params.id] = {
    id: req.params.id,
    ...req.body.studentDetails,
  };
  groupController.changeStudentToGroup(req.params.id, req.body);
  res.json({ status: "success" });
};

let deleteStudent = (req, res) => {
  const { id, house } = req.params;
  delete studentData[id];
  studentData["keys"].splice(studentData["keys"].indexOf(id), 1);
  groupController.removeStudentFromGroup(id, house);
  res.json({ status: "success" });
};

module.exports = {
  getStudents: getStudents,
  getStudent: getStudent,
  addStudent: addStudent,
  editStudent: editStudent,
  deleteStudent: deleteStudent,
};
