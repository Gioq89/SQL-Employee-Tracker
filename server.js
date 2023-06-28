const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

// create the connection to database
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the orgchart_db database.`)
);

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    },
  ])
  .then((answers) => {
    console.log(answers);
    switch (answers.option) {
      case "View All Departments":
        connection.query("SELECT * FROM department", (error, results) => {
          if (error) {
            console.error("Error retrieving departments:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "View All Roles":
        connection.query("SELECT * FROM role", (error, results) => {
          if (error) {
            console.error("Error retrieving departments:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "View All Employees":
        connection.query("SELECT * FROM employee", (error, results) => {
          if (error) {
            console.error("Error retrieving departments:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "Add a Department":
        break;
      case "Add a Role":
        break;
      case "Add an Employee":
        break;
      case "Update an Employee Role":
        break;
      default:
        console.log("error");
    }
  });
