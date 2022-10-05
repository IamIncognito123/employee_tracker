const db = require('../server');
const inquirer = require('inquirer');
const prompt = require('../index');

// const prompt = new Prompt();

class Department {
    constructor(){

    }

    getDepartment(){
        console.log(`department selected`);
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(`\n`)
            console.log(`-------------`)
            console.table(result);
        })
    }

    addDepartment(){
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the department?',
                    name: 'department'

                }
            ])
            
            .then((data) => {
                const sql = `INSERT INTO department (department_name) VALUES (?)`;
                const name = data.department
                db.query(sql, name, (err, result) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                    // console.log(result);
                })
            })

            .then(() => {
                prompt();
            })
            


    }

}

module.exports = Department;