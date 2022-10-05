const db = require('../server');
const inquirer = require('inquirer');

class Role {
    constructor(){};


    getRole(){
        const sql = 'SELECT roles.id AS RoleId, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department FROM roles JOIN department ON roles.department_id = department.id;'
        db.query(sql, (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            console.log(`\n`);
            console.log(`--------------------------------------------------------`);
            console.table(result);
            console.log(`--------------------------------------------------------`);
        })
    }

    addRole(){
        const sql = `SELECT id, department_name FROM department;`;

        db.query(sql, (err, result) => {
            if (err){
                console.log(err);
                return;
            }

            const departmentName = result.map(({department_name}) => department_name);
            const departmentId = result.map(({id}) => id);
            console.log(departmentName);
            console.log(departmentId);

            const departmentObj = {};

            // returns an object of key value pairs between departmentName and departmentId
            // not sure how this quite works
                departmentName.forEach((element, index) => {
                    departmentObj[element] = departmentId[index];
                })

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the role?',
                        name: 'title'
                    },
                    {
                        type: 'input',
                        message: 'What is the salary of the role?',
                        name: 'salary'
                    },
                    {
                        type: 'list',
                        message: 'What department does the role belong to?',
                        choices: departmentName,
                        name: 'department'
                    }
                ])
                .then((data) => {

                    const selectedDepartment = data.department;
                    const departmentIdData = [];

                    for (const key in departmentObj) {
                        if (Object.hasOwnProperty.call(departmentObj, key)) {
                            if(key == selectedDepartment){
                                departmentIdData.push(departmentObj[key]);
                            }

                            
                        }
                    }

                    const sql = `INSERT INTO roles (title, salary, department_id) VALUES(?)`
                    const roleInfo = [data.title, data.salary, departmentIdData];


                    db.query(sql, [roleInfo], (err, result) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        // console.log(result)
                    })
                })



        })

    }


}
module.exports = Role;