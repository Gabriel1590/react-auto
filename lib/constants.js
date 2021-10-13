const TEMPLATES = [

];

const SCHEMAS = [
  [
    'component',
    'c',
    'A Functional Component with its styles with styled-components.',
  ],
  [
    'redux-component',
    'rc',
    'A reducer, actions and types file.',
  ],
  [
    'redux-slice',
    'rs',
    'A redux slice file to insert in the rootReducer.',
  ],
  [
    'redux-config',
    'rconf',
    'A Redux store, rootReducer and personalized hooks, using @reduxjs/toolkit',
  ],
];

const ARGUMENTS = {
  schematics: {
    name: 'schematics',
    description: 'The schematic or collection: schematic to generate.',
    available: SCHEMAS,
  },
  name: {
    name: 'name',
    description: 'The name you want to use.',
    available: [],
  },
  template: {
    name: 'template',
    description: 'The react app template you want to create',
    available: TEMPLATES,
  },
};

const COMMANDS = [
  [
    'create',
    'c',
    'Creates a new workspace and an initial React application.',
    [ARGUMENTS.template, ARGUMENTS.name],
  ],
  [
    'generate',
    'g',
    'Generates and/or modifies files based on a schematic.',
    [ARGUMENTS.schematics, ARGUMENTS.name],
  ],
  [
    'help',
    'h',
    'Lists available commands and their short descriptions.',
    [],
  ],
];

module.exports = {
  SCHEMAS,
  COMMANDS,
  ARGUMENTS,
  TEMPLATES,
};
