INSERT INTO department(id, name)
VALUES (1, "Management"), 
       (2, "Legal"), 
       (3, "Accounting"), 
       (4, "Engineering"), 
       (5, "Testing"), 
       (6, "Design");

INSERT INTO role(id, title, salary, department_id)
VALUES 
    (1, "Manager", 100000, 1),
    (2, "Engineer", 40000, 1),
    (3, "Analyst", 80000, 2),
    (4, "Designer", 60000, 2),
    (5, "Developer", 75000, 3),
    (6, "Tester", 30000, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Santiogo", "Dominguez", 1, 0),
    (2, "Gideon", "Hawthorne", 2, 1),
    (3, "Marigold", "McGowan", 3, 1),
    (4, "Evelyn", "Carter", 4, 2),
    (5, "Charlie", "Blackstaff", 5, 3),
    (6, "Beatrice", "Quickley", 6, 3);

-- Show the tables made
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;    