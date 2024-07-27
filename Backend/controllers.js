const { response } = require("express");
const { dbConnection } = require("./database");

function signupController(req, res) {
  const { firstname, lastname, password, email, address, phone } = req.body;
  console.log(firstname, lastname, email, phone, address, password);
  let sql_query = `insert into users(firstname,lastname,password,email,address,phone) values(?,?,?,?,?,?)`;
  dbConnection.query(
    sql_query,
    [firstname, lastname, password, email, address, phone],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error inserting data into product");
      }
      return res
        .status(200)
        .json({ message: "You have been registered successfully" });
    }
  );
}

function signinController(req, res) {
  const { email, password } = req.body;

  const sql_query = "select * from users where email=? and password=?";
  dbConnection.query(sql_query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send("login Error");
    } else if (result.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      console.log(result);
      return res.status(200).json({
        message: "successfull",
        response: result,
      });
    }
  });
}

function changepassword(req, res) {
  const { email, current_password, new_password } = req.body;
  console.log(req.body);
  const check_user_sql = "SELECT * FROM users where email=? and password=?";
  const update_password_sql = "UPDATE users set password=? where email=?";

  dbConnection.query(
    check_user_sql,
    [email, current_password],
    (error, results) => {
      if (error) {
        return res.status(500).send("Login Error");
      } else if (results.length === 0) {
        return res.json({
          message: "Your current Password is invalid",
        });
      } else {
        dbConnection.query(
          update_password_sql,
          [new_password, email],
          (error, result) => {
            return res.json({ message: "Password Updated Successfully" });
          }
        );
      }
    }
  );
}
function getusersController(req, res) {
  const sql_query = "SELECT * FROM users";
  dbConnection.query(sql_query, async (err, results) => {
    if (err) {
      res.status(500);
      res.send("Error in fetching data");
    } else {
      await res.send(results);
    }
  });
}
///std///
function StudentViewGroupController(req, res) {
  const email = req.params.email;
  const sql_query = "SELECT groupname FROM projectassign  where email=?";
  const sql_query2 =
    "SELECT projectname,projectguide FROM projectgroup  where groupname=?";
  const sql_query3 =
    "select firstname,lastname from users inner join projectassign on users.email = projectassign.email where groupname=? ";
  dbConnection.query(sql_query, [email], (err, result) => {
    if (err) {
      return res.status(400).send("Error to fetching data");
    } else if (result.length == 0) {
      return res.status(200).send("data not found");
    } else {
      let response = result[0].groupname;
      dbConnection.query(sql_query2, [response], (err, results) => {
        if (err) {
          return res.status(400).send("Error to fetching data");
        } else {
          dbConnection.query(sql_query3, [response], (err, resultss) => {
            console.log(resultss);
            return res.status(200).json({
              groupname: response,
              projectname: results[0].projectname,
              projectguide: results[0].projectguide,
              groupmembers: resultss,
            });
          });
        }
      });
    }
  });
}

/////
function adminSignupController(req, res) {
  const { name, email, password } = req.body;
  console.log(req.body);
  console.log(name, email, password);
  let sql_query = `insert into admins(name,password,email) values(?,?,?)`;
  dbConnection.query(sql_query, [name, password, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting data into product");
    }
    return res
      .status(200)
      .json({ message: "You have been registered successfully" });
  });
}

function adminSigninController(req, res) {
  const { email, password } = req.body;

  const sql_query = "select * from admins where email=? and password=?";
  dbConnection.query(sql_query, [email, password], (err, result) => {
    if (err) {
      return res.status(400).json({ message: "err.message" });
    } else if (result.length === 0) {
      return res.status(400).json({ message: "err.message" });
    } else {
      return res.status(200).json({
        message: "successfull",
        response: result,
      });
    }
  });
}
function adminchangepassword(req, res) {
  const { email, current_password, new_password } = req.body;
  console.log(req.body);
  const check_user_sql = "SELECT * FROM admins where email=? and password=?";
  const update_password_sql = "UPDATE admins set password=? where email=?";

  dbConnection.query(
    check_user_sql,
    [email, current_password],
    (error, results) => {
      if (error) {
        return res.status(500).send("Login Error");
      } else if (results.length === 0) {
        return res.json({
          message: "Your current Password is invalid",
        });
      } else {
        dbConnection.query(
          update_password_sql,
          [new_password, email],
          (error, result) => {
            return res.json({ message: "Password Updated Successfully" });
          }
        );
      }
    }
  );
}

function deleteStudentsController(req, res) {
  const email = req.params.email;
  console.log(email);
  const student_delete_sql = "DELETE FROM users WHERE email=?";
  // const user_delete_sql = "DELETE FROM user WHERE email=?";

  dbConnection.query(student_delete_sql, [email], (error, result) => {
    if (error) {
      res.status(500);
      res.send("Error deleting data into student");
    } else {
      res.status(200);
      res.send("Record deleted successfully");
    }
  });
}
function oneditController(req, res) {
  const { id, firstname, lastname, email, address, phone } = req.body;
  console.log(req.body);
  // let sql_query = `insert into users(firstname,lastname,password,email,address,phone) values(?,?,?,?,?,?)`;
  let sql_query = `UPDATE users SET firstname = ?,lastname=?, email =?, phone = ?,address=? WHERE id = ${id};
`;
  dbConnection.query(
    sql_query,
    [firstname, lastname, email, phone, address],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error inserting data into product");
      }
      return res
        .status(200)
        .json({ message: "You have been successfully update the data" });
    }
  );
}

function creategroupController(req, res) {
  const { groupname, projectname, projectguide } = req.body;
  let sql_query = `insert into projectgroup(groupname,projectname,projectguide) values(?,?,?)`;
  dbConnection.query(
    sql_query,
    [groupname, projectname, projectguide],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error inserting data into product");
      }
      return res.status(200).json({ message: "Group Createing Successfully" });
    }
  );
}

function AssignstudentController(req, res) {
  const sql_query = `SELECT users.email
  FROM users
  left JOIN projectassign ON users.email = projectassign.email
  WHERE projectassign.email IS NULL OR projectassign.groupname = '';
  
  `;
  const sql_query2 = `select groupname from projectgroup`;

  dbConnection.query(sql_query, async (err, results1) => {
    if (err) {
      res.status(500);
      res.send("Error in fetching data");
    } else {
      dbConnection.query(sql_query2, async (err, results2) => {
        if (err) {
          res.status(500);
          res.send("Error in fetching data");
        } else {
          await res
            .status(200)
            .json({ response1: results1, response2: results2 });
        }
      });
    }
  });
}
function AssignprojectController(req, res) {
  const { email, groupname } = req.body;
  console.log(req.body);
  let sql_query = `insert into projectassign(email, groupname) values(?,?)`;
  dbConnection.query(sql_query, [email, groupname], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error inserting data into product");
    }
    return res.status(200).json({ message: " successfully added" });
  });
}

function viewgroupsController(req, res) {
  const sql_query = "SELECT * FROM projectgroup";
  dbConnection.query(sql_query, async (err, results) => {
    if (err) {
      res.status(500);
      res.send("Error in fetching data");
    } else {
      await res.send(results);
    }
  });
}

function viewgrouponeditController(req, res) {
  const { id, groupname, projectname, projectguide } = req.body;
  console.log(req.body);
  // let sql_query = `insert into users(firstname,lastname,password,email,address,phone) values(?,?,?,?,?,?)`;
  let sql_query = `UPDATE projectgroup SET groupname = ?,projectname=?, projectguide =? WHERE id = ${id};
  `;
  dbConnection.query(
    sql_query,
    [groupname, projectname, projectguide],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error inserting data into product");
      }
      return res
        .status(200)
        .json({ message: "You have been successfully update the data" });
    }
  );
}
module.exports = {
  signupController,
  signinController,
  adminSignupController,
  adminSigninController,
  adminchangepassword,
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
};
