const express = require("express");
const router = express.Router();

const studentController = require("./../controllers/studentController");
const groupController = require("./../controllers/groupController");

router.route("/test").get((_req, res) => {
  res.json({
    status: "success",
  });
});

//student related APIs
router.route("/students/:id").get(studentController.getStudent);
router.route("/students").get(studentController.getStudents);
router.route("/add-student").post(studentController.addStudent);
router.route("/edit-student/:id").post(studentController.editStudent);
router
  .route("/delete-student/:id/:house")
  .delete(studentController.deleteStudent);

//group related APIs
router.route("/groups").get(groupController.getGroups);
router.route("/add-group").post(groupController.addGroup);

module.exports = router;
