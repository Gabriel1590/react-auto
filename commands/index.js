const argvs = Array.from(process.argv).slice(1);
const [, command, ...rest] = argvs;

function init() {
  if (rest.includes('--help')) {
    const index = argvs.indexOf('--help');
    if (index > -1) {
      argvs.splice(index);
    }
    showComandInfo();
    return;
  }

  if (command === 'c' || command === 'create') {
    require('../commands/create');
  } else if (command === 'g' || command === 'generate') {
    require('../commands/generate');
  } else {
    showCommandsHelp();
  }
}

init();