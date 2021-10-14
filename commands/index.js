const { COMMANDS } = require('../lib/constants');

const argvs = Array.from(process.argv).slice(1);
const [, command, ...rest] = argvs;

function init() {
  if (rest.includes('--help')) {
    require('./help');
    return;
  }

  for (let i = 0; i < COMMANDS.length; i++) {
    const [commandName, commandShortName] = COMMANDS[i];
    if (command === commandName || command === commandShortName) {
      if (commandName === 'help') {
        require('./help');
        return;
      }
      // eslint-disable-next-line import/no-dynamic-require
      require(`./${commandName}`);
      return;
    }
  }
  require('./help');
}

init();
