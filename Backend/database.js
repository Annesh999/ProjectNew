const mysql = require("mysql2");
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "projecthub",
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connected");
});

module.exports = {
  dbConnection,
};
