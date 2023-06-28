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
        const departmentQuery = "SELECT id, name FROM department";
        connection.query(departmentQuery, (error, results) => {
          if (error) {
            console.error("Error retrieving departments:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "View All Roles":
        const roleQuery = "SELECT role.id, role.id, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id";
        connection.query(roleQuery, (error, results) => {
            if (error) {
              console.error("Error retrieving departments:", error);
            } else {
              console.table(results);
            }
            connection.end();
          }
        );
        break;
      case "View All Employees":
        const employeeQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
        connection.query(employeeQuery, (error, results) => {
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
