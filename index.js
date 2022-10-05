const inquirer = require('inquirer');
// const express = require('express');
const mysql = require('mysql2');

// importing classes 
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee =require('./lib/employee');

// instantiating classes to use their functions in prompt
const department = new Department();
const role = new Role();
const employee = new Employee();

// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// class Prompt{

    
const runPrompt = () =>{

const selectOptions = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
const carCheck = [];

inquirer
    .prompt([
        {
            type: 'list',
            message:'What would you like to do?',
            choices: selectOptions,
            name: 'selectedChoice',
            pageSize: 10
        }
    ])

    .then((data) => {
        switch(data.selectedChoice){
            case selectOptions[0]:
                // use department class
                department.getDepartment();
                break;

            case selectOptions[1]:
                role.getRole();

                break;

            case selectOptions[2]:
                employee.getEmployee();

                break;

            case selectOptions[3]:
                department.addDepartment();


                break;
            case selectOptions[4]:
                // use department class
                role.addRole();

                break;

            case selectOptions[5]:
                employee.addEmployee();


                break;
            case selectOptions[6]:
                employee.updateEmployeeRole()


                break;
            case selectOptions[7]:
                process.exit();
            default:
                process.exit();
        }


    })
    

// }

// promptHandle(){
//     return this.runPrompt();
// }

}



// const prompt = new Prompt();

runPrompt();


// export for functions
exports.runPrompt = runPrompt;
