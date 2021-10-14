const { COMMANDS } = require('../../lib/constants');

const argvs = Array.from(process.argv).slice(1);
const [, command, ...rest] = argvs;

function init() {
  if (rest.includes('--help')) {
    const index = argvs.indexOf('--help');
    if (index > -1) {
      argvs.splice(index);
    }
  }
  showComandInfo();
}

function showCommandsHelp() {
  console.log('\nAvailable Commands:\r');
  for (let i = 0; i < COMMANDS.length; i++) {
    const [name, shortName, description] = COMMANDS[i];
    printCommand(`[${name}][${shortName}]`, description);
  }
}

function showComandInfo() {
  let findedCommand = false;
  for (let i = 0; i < COMMANDS.length; i++) {
    const [name, shortName,, argumentList] = COMMANDS[i];

    if (command === name || command === shortName) {
      findedCommand = name !== 'help';
      let parsedArguments = '';

      for (let j = 0; j < argumentList.length; j++) {
        const argument = argumentList[j];
        parsedArguments += `<${argument.name}> `;
      }

      console.log(argvs.join(' '), parsedArguments);

      if (argumentList.length) {
        console.log('\nArguments');
      }

      for (let j = 0; j < argumentList.length; j++) {
        const argument = argumentList[j];
        printCommand(`[${argument.name}]`, argument.description);
      }

      for (let j = 0; j < argumentList.length; j++) {
        const argument = argumentList[j];
        if (argument.available.length) {
          console.log(`\nAvailable ${argument.name}`);

          for (let k = 0; k < argument.available.length; k++) {
            const [availableName, availableShortName, availableDescription] = argument.available[k];
            printCommand(`[${availableName}][${availableShortName}]`, availableDescription);
          }
        }
      }
    }
  }

  if (!findedCommand) {
    showCommandsHelp();
  }
}

function printCommand(commandText = '', description = '') {
  console.log(`\t\x1b[1m\x1b[36m${commandText}:\x1b[0m ${description}`);
}

init();
