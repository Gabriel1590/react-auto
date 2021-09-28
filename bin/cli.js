#! /usr/bin/env node

const fs = require('fs');

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

const [command] = Array.from(process.argv).slice(2);

if (command === 'c' || command === 'create') {
    require('../commands/create.js');
} else if (command === 'g' || command === 'generate') {
    require('../commands/generate.js');
} else {
    showHelp()
}

function showHelp() {
    console.log('\nAvailable Commands:\r');
    printCommand('[create][c]', 'Creates a new workspace and an initial React application.');
    printCommand('[generate][g]', 'Generates and/or modifies files based on a schematic.');
    // printCommand('[version][v]', 'Outputs React Auto version.');
    printCommand('[help]', 'Lists available commands and their short descriptions.');
}

function printCommand(command = '', description = '') {
    console.log(`\t\x1b[1m\x1b[36m${command}:\x1b[0m ${description}`);
}