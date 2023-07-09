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
        "Update an Employee Manager",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee",
        "View the Total Utilized Budget of a Department",
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
        const roleQuery =
          "SELECT role.id, role.id, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id";
        connection.query(roleQuery, (error, results) => {
          if (error) {
            console.error("Error retrieving departments:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "View All Employees":
        const employeeQuery =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
        connection.query(employeeQuery, (error, results) => {
          if (error) {
            console.error("Error retrieving employees:", error);
          } else {
            console.table(results);
          }
          connection.end();
        });
        break;
      case "Add a Department":
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the department?",
              name: "departmentName",
            },
          ])
          .then((answers) => {
            const departmentName = answers.departmentName;
            const departmentQuery = "INSERT INTO department (name) VALUES (?)";
            connection.query(
              departmentQuery,
              departmentName,
              (error, results) => {
                if (error) {
                  console.error("Error adding department:", error);
                } else {
                  console.log("Department added successfully!");
                }
                connection.end();
              }
            );
          });
        break;
      case "Add a Role":
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the name of the role?",
              name: "roleName",
            },
            {
              type: "input",
              message: "What is the salary of the role?",
              name: "roleSalary",
            },
            {
              type: "input",
              message: "What is the department ID of the role?",
              name: "roleDepartmentId",
            },
          ])
          .then((answers) => {
            const roleName = answers.roleName;
            const roleSalary = answers.roleSalary;
            const roleDepartmentId = answers.roleDepartmentId;
            const roleQuery =
              "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(
              roleQuery,
              [roleName, roleSalary, roleDepartmentId],
              (error, results) => {
                if (error) {
                  console.error("Error adding role:", error);
                } else {
                  console.log("Role added successfully!");
                }
                connection.end();
              }
            );
          });
        break;
      case "Add an Employee":
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "employeeFirstName",
            },
            {
              type: "input",
              message: "What is the employee's last name?",
              name: "employeeLastName",
            },
            {
              type: "input",
              message: "What is the employee's role ID?",
              name: "employeeRoleId",
            },
            {
              type: "input",
              message: "What is the employee's manager ID?",
              name: "employeeManagerId",
            },
          ])
          .then((answers) => {
            const employeeFirstName = answers.employeeFirstName;
            const employeeLastName = answers.employeeLastName;
            const employeeRoleId = answers.employeeRoleId;
            const employeeManagerId = answers.employeeManagerId;
            const employeeQuery =
              "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)";
            connection.query(
              employeeQuery,
              [
                null,
                employeeFirstName,
                employeeLastName,
                employeeRoleId,
                employeeManagerId,
              ],
              (error, results) => {
                if (error) {
                  console.error("Error adding employee:", error);
                } else {
                  console.log("Employee added successfully!");
                }
                connection.end();
              }
            );
          });
        break;
      case "Update an Employee Role":
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "What is the ID of the employee you would like to update?",
              name: "employeeId",
            },
            {
              type: "input",
              message: "What is the new role ID of the employee?",
              name: "employeeRoleId",
            },
          ])
          .then((answers) => {
            const employeeId = answers.employeeId;
            const employeeRoleId = answers.employeeRoleId;
            const employeeQuery =
              "UPDATE employee SET role_id = ? WHERE id = ?";
            connection.query(
              employeeQuery,
              [employeeRoleId, employeeId],
              (error, results) => {
                if (error) {
                  console.error("Error updating employee:", error);
                } else {
                  console.log("Employee role updated successfully!");
                }
                connection.end();
              }
            );
          });
        break;
      case "Update Employee Manager":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the employee you want to update:",
              name: "employeeId",
            },
            {
              type: "input",
              message: "Enter the new manager ID:",
              name: "managerId",
            },
          ])
          .then((answers) => {
            const employeeId = answers.employeeId;
            const managerId = answers.managerId;
            const updateQuery =
              "UPDATE employee SET manager_id = ? WHERE id = ?";
            connection.query(
              updateQuery,
              [managerId, employeeId],
              (error, results) => {
                if (error) {
                  console.error("Error updating employee:", error);
                } else {
                  console.log("Employee manager updated successfully!");
                }
                connection.end();
              }
            );
          });
        break;
      case "View Employees by Manager":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the manager:",
              name: "managerId",
            },
          ])
          .then((answers) => {
            const managerId = answers.managerId;
            const query =
              "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE employee.manager_id = ?";
            connection.query(query, [managerId], (error, results) => {
              if (error) {
                console.error("Error retrieving employees:", error);
              } else {
                console.table(results);
              }
              connection.end();
            });
          });
        break;
      case "View Employees by Department":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the department:",
              name: "departmentId",
            },
          ])
          .then((answers) => {
            const departmentId = answers.departmentId;
            const query =
              "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.id = ?";
            connection.query(query, [departmentId], (error, results) => {
              if (error) {
                console.error("Error retrieving employees:", error);
              } else {
                console.table(results);
              }
              connection.end();
            });
          });
        break;
      case "Delete a Department":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the department you want to delete:",
              name: "departmentId",
            },
          ])
          .then((answers) => {
            const departmentId = answers.departmentId;
            const query = "DELETE FROM department WHERE id = ?";
            connection.query(query, [departmentId], (error, results) => {
              if (error) {
                console.error("Error deleting department:", error);
              } else {
                console.log("Department deleted successfully!");
              }
              connection.end();
            });
          });
        break;
      case "Delete a Role":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the role you want to delete:",
              name: "roleId",
            },
          ])
          .then((answers) => {
            const roleId = answers.roleId;
            const query = "DELETE FROM role WHERE id = ?";
            connection.query(query, [roleId], (error, results) => {
              if (error) {
                console.error("Error deleting role:", error);
              } else {
                console.log("Role deleted successfully!");
              }
              connection.end();
            });
          });
        break;
      case "Delete an Employee":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the employee you want to delete:",
              name: "employeeId",
            },
          ])
          .then((answers) => {
            const employeeId = answers.employeeId;
            const query = "DELETE FROM employee WHERE id = ?";
            connection.query(query, [employeeId], (error, results) => {
              if (error) {
                console.error("Error deleting employee:", error);
              } else {
                console.log("Employee deleted successfully!");
              }
              connection.end();
            });
          });
        break;
      case "View the Total Utilized Budget of a Department":
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter the ID of the department:",
              name: "departmentId",
            },
          ])
          .then((answers) => {
            const departmentId = answers.departmentId;
            const query =
              "SELECT department.name AS department, SUM(role.salary) AS utilized_budget FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.id = ?";
            connection.query(query, [departmentId], (error, results) => {
              if (error) {
                console.error("Error retrieving utilized budget:", error);
              } else {
                console.table(results);
              }
              connection.end();
            });
          });
        break;
        
      default:
        console.log("Invalid option selected. Please choose a valid option.");
        connection.end();
    }
  });
