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
  printCommand('[create][c]', 'Creates a new workspace and an initial React application.');
  printCommand('[generate][g]', 'Generates and/or modifies files based on a schematic.');
  // printCommand('[version][v]', 'Outputs React Auto version.');
  printCommand('[help]', 'Lists available commands and their short descriptions.');
}

function showComandInfo() {
  if (command === 'c' || command === 'create') {
    console.log(argvs.join(' '));
  } else if (command === 'g' || command === 'generate') {
    if (argvs.length < 3) {
      console.log(argvs.join(' '), '<schematic> <name>');

      console.log('\nArguments');
      printCommand('[schematic]', 'The schematic or collection: schematic to generate');
      printCommand('[name]', 'The name of the schematic');

      console.log('\nAvailable Schematics');
      printCommand('[component][c]', 'A Functional Component with its styles with styled-components');
      printCommand('[redux-component][rc]', 'A reducer, actions and types file.');
    } else if (argvs.length < 4) {
      console.log(argvs.join(' '), '<name>');
      printCommand('[name]', 'The name of the schematic');
    }
  } else {
    showCommandsHelp();
  }
}

function printCommand(commandText = '', description = '') {
  console.log(`\t\x1b[1m\x1b[36m${commandText}:\x1b[0m ${description}`);
}

init();
