/**
 * @param {string} name
 * @param {string} location
 */
function generate(name, location) {
  
}

const fs = require('fs');
const { createDir } = require('../../lib/utils');

const CURR_DIR = process.cwd();

function createSchema(typeOfSchema = 'component', { location = '.', name = '', ext = 'ts' }) {
  createDir(`${CURR_DIR}/${location}`, name);

  const templatePath = `${__dirname}/../../templates/schemas/${typeOfSchema}/${ext}`;
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    let contents = fs.readFileSync(origFilePath, 'utf8');

    const writePath = `${writeDirPath}/${file}`;
    contents = addNameToContent(typeOfSchema, name, contents);
    fs.writeFileSync(writePath, contents, 'utf8');
  });

  if (typeOfSchema === 'redux-config' && ext === 'ts') {
    createSchema(typeOfSchema, { location: `${location}/../`, name: 'hooks', ext: 'hooks' });
  }
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

module.exports = { generate };
