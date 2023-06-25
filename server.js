const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "name",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Employess",
      "Add a Role",
      "Add an Employee",
      "Update am Employee Role",
    ],
  },
]);
