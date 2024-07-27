const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const {
  signupController,
  signinController,
  adminSignupController,
  adminSigninController,
  changepassword,

  getusersController,
  deleteStudentsController,
  oneditController,
  creategroupController,
  AssignstudentController,
  AssignprojectController,
  viewgroupsController,
  viewgrouponeditController,
  StudentViewGroupController,
  adminchangepassword,
} = require("./controllers");
const { dbConnection } = require("./database");

const app = express();
app.use(bodyparser.json());
app.use(cors());

const PORT = 5000;

app.post("/signup", signupController);
app.post("/studentlogin", signinController);
app.post("/changepassword", changepassword);
app.get("/viewgroup/:email", StudentViewGroupController);

app.post("/adminchangepassword", adminchangepassword);
app.post("/adminsignup", adminSignupController);
app.post("/adminlogin", adminSigninController);
app.get("/getusers", getusersController);
app.post("/onedit", oneditController);
app.post("/creategroup", creategroupController);
app.post("/creategroup", creategroupController);
app.get("/registerstudents", AssignstudentController);
app.post("/assignproject", AssignprojectController);
app.get("/viewgroups", viewgroupsController);
app.post("/viewgrouponedit", viewgrouponeditController);

app.delete("/removegroup/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const student_delete_sql = "DELETE FROM projectgroup WHERE id=?";
  dbConnection.query(student_delete_sql, [id], (error, result) => {
    if (error) {
      res.status(500);
      res.send("Error deleting data into student");
    } else {
      res.status(200);
      res.send("Record deleted successfully");
    }
  });
});

app.delete("/removeUsers/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
  const student_delete_sql = "DELETE FROM users WHERE email=?";

  dbConnection.query(student_delete_sql, [email], (error, result) => {
    if (error) {
      res.status(500);
      res.send("Error deleting data into student");
    } else {
      res.status(200);
      res.send("Record deleted successfully");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server stated at http://localhost:${PORT}`);
});
