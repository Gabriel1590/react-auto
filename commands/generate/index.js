/* eslint-disable import/no-dynamic-require */
const inquirer = require('inquirer');
const { SCHEMAS } = require('../../lib/constants');

const schemasModules = SCHEMAS
  .reduce((modules, [name]) => {
    // eslint-disable-next-line no-param-reassign
    modules[name] = require(`./${name}`);
    return modules;
  }, {});

async function init() {
  try {
    const typeOfSchema = await getTypeOfSchema();
    const { name, location } = await getFileData(typeOfSchema === 'component');
    schemasModules[typeOfSchema].generate(name, location);
  } catch (error) {
    console.log(error.message || error);
  }
}

async function getTypeOfSchema() {
  let [typeOfSchema] = Array.from(process.argv).slice(3);
  let recognizedSchema = false;

  for (let i = 0; i < SCHEMAS.length; i++) {
    const [schemaName, schemaShortName] = SCHEMAS[i];
    if (typeOfSchema === schemaName || typeOfSchema === schemaShortName) {
      typeOfSchema = schemaName;
      recognizedSchema = true;
      break;
    }
  }

  if (!recognizedSchema) {
    const questions = [
      {
        name: 'schema-choice',
        type: 'list',
        message: 'What schema template would you like to generate?',
        choices: SCHEMAS.map(([schemaName]) => schemaName),
      },
    ];

    const answers = await inquirer.prompt(questions);
    typeOfSchema = answers['schema-choice'];
  }

  return typeOfSchema;
}

async function getFileData() {
  let [location] = Array.from(process.argv).slice(4);
  if (!location) {
    const questions = [
      {
        name: 'schema-location',
        type: 'input',
        message: 'Schema location:',
        validate(input) {
          if (/^([A-Za-z\-\_\d\/])+$/.test(input)) return true;
          return 'Schema location may only include letters, numbers, underscores and hashes.';
        },
      },
    ];
    const answers = await inquirer.prompt(questions);

    location = answers['schema-location'];
  }

  const splitedLocation = location.replace(' ', '-').split('/');

  const name = splitedLocation.pop();

  if (!/^([A-Za-z\-\_\d])+$/.test(name)) {
    throw new Error('Schema name may only include letters, numbers, underscores and hashes.');
  }

  return { location: splitedLocation.join('/') || '.', name };
}

init();
