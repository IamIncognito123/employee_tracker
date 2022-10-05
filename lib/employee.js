const db = require('../server');
const inquirer = require('inquirer');
const runPrompt = require('../index');

// const prompt = new Prompt;

class Employee {
    constructor(){}


    getEmployee(){
        const sql = `SELECT employee.id AS EmployeeId, employee.first_name AS FirstName, 
        employee.last_name AS LastName, roles.title AS Title, 
        department.department_name AS Department, roles.salary AS Salary 
        FROM employee 
        JOIN roles ON employee.role_id = roles.id
        JOIN department ON roles.department_id = department.id;`;

        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(`\n`)
            console.log(`-------------------------------------------------------------------------------------------------`);
            console.table(result);
            console.log(`-------------------------------------------------------------------------------------------------`);
            runPrompt.runPrompt();
        })

    }



    addEmployee(){
        const sql = `SELECT id, title FROM roles;`;
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return;
            }

            
            // takes the title of the results and stores it in an array 
            const roleTitle = result.map(({title}) => title);
            const roleId = result.map(({id}) => id);

            const roleObj = {};

            roleTitle.forEach((element, index) => {
                roleObj[element] = roleId[index];
            });

            // console.log(roleObj);

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the employees first name?',
                        name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'What is the employees last name?',
                        name: 'lastName'
                    },
                    {
                        type: 'list',
                        message: 'What is the employees role?',
                        choices: roleTitle,
                        name: 'title'
                    }
                ])

                .then((data) => {
                    const selectedTitle = data.title;
                    const roleDataId = [];

                    for (const key in roleObj) {
                        if (Object.hasOwnProperty.call(roleObj, key)) {
                            if (key == selectedTitle){
                                roleDataId.push(roleObj[key]);
                            }
                            
                            
                        }
                    }

                    const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?);`;
                    const employeeInfo = [data.firstName, data.lastName, roleDataId];
                    console.log(data.lastName);

                    db.query(sql, employeeInfo, (err, result) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        // console.table(result);
                    })
                    runPrompt.runPrompt();
                })
        })
    }

    updateEmployeeRole(){
        const sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee;`;
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return;
            }



            const employeeId = result.map(({id}) => id);
            const firstName = result.map(({first_name}) => first_name);
            const lastName = result.map(({last_name}) => last_name);

            // add first and last name arrays together
            var employeeName = firstName.map((first, last) => {
                return first + ' ' + lastName[last];
            })
            
            // create an key value pair with name and ID
            const nameIdObj = {};
            employeeName.forEach((element, index) => {
                nameIdObj[element] = employeeId[index];
            });



            const sql2 = `SELECT roles.id, roles.title FROM roles;`
            db.query(sql2, (err, result2) => {
                if(err){
                    console.log(err);
                    return;
                }



                const roleTitle = result2.map(({title}) => title);
                const roleId = result2.map(({id}) => id);

                const roleObj = {}
                // create a key value pair with two arrays
                roleTitle.forEach((element, index) => {
                    roleObj[element] = roleId[index];
                });
                
                // console.log(roleObj);

                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'Which employees role would you like to update?',
                            choices: employeeName,
                            name:'selectedName'
                        },
                        {
                            type: 'list',
                            message: 'Which role would you like to assign the selected employee?',
                            choices: roleTitle,
                            name: 'selectedRole'
                        }

                    ])
                    .then((data) => {
                        // select the employee id and update the role id on employees table
                        const selectedEmployeeName = data.selectedName;
                        const selectedEmployeeId = [];

                        // iterates over the nameIdObj for its keys, checks if the key is 
                        // equal to the selected name in the prompt and pushes the key's value 
                        for (const key in nameIdObj) {
                            if (Object.hasOwnProperty.call(nameIdObj, key)) {
                                if(key == selectedEmployeeName){
                                    selectedEmployeeId.push(nameIdObj[key])
                                }
                                
                            }
                        }

                        const selectedEmployeeRole = data.selectedRole;
                        const selectedEmployeeRoleId = [];
                        
                        for (const key in roleObj) {
                            if (Object.hasOwnProperty.call(roleObj, key)) {
                                if(key == selectedEmployeeRole){
                                    selectedEmployeeRoleId.push(roleObj[key])
                                }
                                
                            }
                        }


                        const sql3 = `UPDATE employee 
                        SET role_id = (?)
                        WHERE id = (?);`;
                        const roleInfoId = [selectedEmployeeRoleId, selectedEmployeeId];
                        // const employeeId = ;
                        db.query(sql3, roleInfoId, (err, result3) => {
                            if(err){
                                console.log(err);
                                return;
                            }
                            // console.log(result3)

                        })

                        runPrompt.runPrompt();

                    })
            

            })

        })
    }


}

module.exports = Employee;