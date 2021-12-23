const { get } = require("express/lib/response");
const mockGroupData = require("../data/groupData");

let groupData = mockGroupData.groupData;

let getGroups = (req, res) => {
  res.json({ status: "success", data: groupData });
};

let addGroup = (req, res) => {
  console.log(req.body);
  newGroupDetails = {
    ...req.body,
    members: [],
  };
  groupData[req.body.groupName] = newGroupDetails;
  groupData["keys"].push(newGroupDetails.groupName);
  res.json({ status: "success", data: newGroupDetails });
};

//functions to modify group data when student data modified
let addStudentToGroup = (newStudentDetails) => {
  console.log("adding member to group...");
  const { house, id, name } = newStudentDetails;
  groupData[house].members.push({ id: id, name: name });
  console.log("member added to group");
};

let changeStudentToGroup = (id, body) => {
  console.log(body);
  groupData[body.studentDetails.house].members.push({
    id: id,
    name: body.studentDetails.name,
  });
  removeStudentFromGroup(id, body.previousGroup);
};

let removeStudentFromGroup = (id, group) => {
  let filterArray = groupData[group].members.filter(
    (member) => member.id !== id
  );
  groupData[group].members = filterArray;
};

module.exports = {
  getGroups: getGroups,
  addGroup: addGroup,
  addStudentToGroup: addStudentToGroup,
  changeStudentToGroup: changeStudentToGroup,
  removeStudentFromGroup: removeStudentFromGroup,
};
