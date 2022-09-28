const inquirer = require('inquirer');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');


const selectOptions = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role' ]

const runPrompt = () =>{

inquirer
    .prompt([
        {
            type: 'list',
            message:'What would you like to do?',
            choices: selectOptions,
            name: 'selectedChoice'
        }
    ])

}


runPrompt();