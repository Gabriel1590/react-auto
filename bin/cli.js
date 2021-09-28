#! /usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const utils = require('./utils.js')

const TEMPLATE_CHOICES = fs.readdirSync(`${__dirname}/../templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: TEMPLATE_CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    }
];

// const a = Array.from(process.argv).slice(2);
// console.log(a);
inquirer.prompt(QUESTIONS)
    .then(utils.createProject)
    .catch((err) => {
        console.error(err)
    });
