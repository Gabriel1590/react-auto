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

const CURR_DIR = process.cwd();

inquirer.prompt(QUESTIONS)
    .then(answers => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;
    
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);

        utils.createDirectoryContents(templatePath, projectName);
});
