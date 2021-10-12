const argvs = Array.from(process.argv).slice(1);
const [, command, ...rest] = argvs;

const COMMANDS = [
  ['create', 'c'],
  ['generate', 'g'],
];

function init() {
  if (rest.includes('--help')) {
    require('./help');
    return;
  }

  for (let i = 0; i < COMMANDS.length; i++) {
    const [commandName, commandShortName] = COMMANDS[i];
    if (command === commandName || command === commandShortName) {
      // eslint-disable-next-line import/no-dynamic-require
      require(`./${commandName}`);
      return;
    }
  }
  require('./help');
}

init();
