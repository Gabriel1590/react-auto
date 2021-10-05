const fs = require('fs');
const inquirer = require('inquirer');

const CURR_DIR = process.cwd();

async function init() {
  try {
    const typeOfSchema = await getTypeOfSchema();
    const fileData = await getFileData(typeOfSchema === 'component');
    createSchema(typeOfSchema, fileData);
  } catch (error) {
    console.log(error.message || error);
  }
}

async function getTypeOfSchema() {
  let [typeOfSchema] = Array.from(process.argv).slice(3);

  if (typeOfSchema === 'c' || typeOfSchema === 'component') {
    typeOfSchema = 'component';
  } else if (typeOfSchema === 'rc' || typeOfSchema === 'redux-component') {
    typeOfSchema = 'redux-component';
  } else {
    const TEMPLATE_CHOICES = fs.readdirSync(`${__dirname}/../templates/schemas`);

    const QUESTIONS = [
      {
        name: 'schema-choice',
        type: 'list',
        message: 'What schema template would you like to generate?',
        choices: TEMPLATE_CHOICES,
      },
    ];

    const answers = await inquirer.prompt(QUESTIONS);
    typeOfSchema = answers['schema-choice'];
  }

  return typeOfSchema;
}

async function getFileData(uppercase = false) {
  let [location] = Array.from(process.argv).slice(4);
  if (!location) {
    const QUESTIONS = [
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
    const answers = await inquirer.prompt(QUESTIONS);

    location = answers['schema-location'];
  }

  const splitedLocation = location.replace(' ', '-').split('/');

  let name = splitedLocation.pop();
  if (uppercase) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  if (!/^([A-Za-z\-\_\d])+$/.test(name)) {
    throw new Error('Schema name may only include letters, numbers, underscores and hashes.');
  }

  return { location: splitedLocation.join('/') || '.', name };
}

function createSchema(typeOfSchema, { location, name }) {
  const writeDirPath = `${CURR_DIR}/${location}/${name}`;
  const dirExists = fs.existsSync(writeDirPath);

  if (!dirExists) {
    fs.mkdirSync(writeDirPath);
  } else if (fs.readdirSync(writeDirPath)[0]) {
    throw new Error(`Error: Directory ${name} is not empty`);
  }

  const templatePath = `${__dirname}/../templates/schemas/${typeOfSchema}/ts`;
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    let contents = fs.readFileSync(origFilePath, 'utf8');

    const writePath = `${writeDirPath}/${file}`;
    contents = addNameToContent(typeOfSchema, name, contents);
    fs.writeFileSync(writePath, contents, 'utf8');
  });
}

function addNameToContent(typeOfSchema, name, contents) {
  let modifiedContent = contents;
  switch (typeOfSchema) {
    case 'component': {
      modifiedContent = modifiedContent.replace(/Component/g, `${name}Component`);
      break;
    }
    case 'redux-component': {
      modifiedContent = modifiedContent.replace(/Action/g, `${name}Action`);
      modifiedContent = modifiedContent.replace(/Reducer/g, `${name}Reducer`);
      modifiedContent = modifiedContent.replace(/State/g, `${name}State`);
      break;
    }
    default:
      return modifiedContent;
  }
  return modifiedContent;
}

init();
