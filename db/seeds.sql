INSERT INTO department(id, name)
VALUES 
    (1, "Sales"),
    (2, "Finance"),
    (3, "Engineering");

INSERT INTO manager(id, first_name, last_name)
VALUES 
    (1, "Tom", "Brady"),
    (2, "Michael", "Jordan"),
    (3, "Alex", "Rodriguez"),
    (4, "Kevin", "Hart"),
    (5, "Jim", "Brown"),
    (6, "Sarah", "Garcia"),
    (7, "Tim", "Allen");

INSERT INTO role(id, title, salary, department_id)
VALUES 
    (1, "Sales Lead", 100000, 1),
    (2, "Salesperson", 80000, 1),
    (3, "Lead Engineer", 150000, 3),
    (4, "Software Engineer", 120000, 3),
    (5, "Accountant", 125000, 2),
    (6, "Legal Team Lead", 250000, 2),
    (7, "Lawyer", 190000, 2);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "John", "Doe", 1, NULL),
    (2, "Mike", "Chan", 2, 1),
    (3, "Ashley", "Rodriguez", 3, NULL),
    (4, "Kevin", "Tupik", 4, 3),
    (5, "Malia", "Brown", 5, 6),
    (6, "Sarah", "Lourd", 6, 7),
    (7, "Tom", "Allen", 7, 6);

-- Show the tables made
SELECT * FROM department;
SELECT * FROM manager;
SELECT * FROM role;
SELECT * FROM employee;    