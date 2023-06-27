const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();


// // create the connection to database
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//   });

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Employees",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
    },
  ])
  .then((choices) => {
      console.log(choices);
    switch (choices.option) {
      case "View All Employees":
        break;
      case "View All Roles":
        break;
      case "View All Employees":
        break;
      case "Add a Role":
        break;
      case "Add an Employee":
        break;
      case "Update an Employee Role":
        break;
      default:
    }
  });
