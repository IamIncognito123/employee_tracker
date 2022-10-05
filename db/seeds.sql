INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Marketing'),
       ('Human Resourses');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 80000, 2),
       ('Sales Rep', 50000, 2),
       ('Marketing Associate', 60000, 2);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Anhvu', 'Nguyen', 1),
       ('Dan', 'Man', 2),
       ('Bob', 'Can', 2),
       ('Eliza', 'Jumbalya', 3);


-- SELECT employee.id AS EmployeeId, employee.first_name AS FirstName, 
-- employee.last_name AS LastName, roles.title AS Title, 
-- department.department_name AS Department, roles.salary AS Salary 
-- FROM employee 
-- JOIN roles ON employee.role_id = roles.id
-- JOIN department ON roles.department_id = department.id;

UPDATE employee 
SET role_id = (?)
WHERE id = (?);