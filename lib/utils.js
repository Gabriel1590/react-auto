const fs = require('fs');

/**
 * @param {string} location
 * @param {string} name
 */
function createDir(location, name) {
  const writeDirPath = `${location}/${name}`;
  const dirExists = fs.existsSync(writeDirPath);

  if (!dirExists) {
    fs.mkdirSync(writeDirPath, { recursive: true });
  } else if (fs.readdirSync(writeDirPath)[0]) {
    throw new Error(`Error: Directory ${name} is not empty`);
  }
}

/**
 * @param {string} locationInSchemasTemplates
 * @param {string} locationToPaste
 * @param {(content: string) => string} customize
 */
function createSchema(locationInSchemasTemplates, locationToPaste, customize) {
  const templatePath = `${__dirname}/../templates/schemas/${locationInSchemasTemplates}`;
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;
    let contents = fs.readFileSync(origFilePath, 'utf8');

    const writePath = `${locationToPaste}/${file}`;
    if (customize) {
      contents = customize(contents);
    }
    fs.writeFileSync(writePath, contents, 'utf8');
  });
}

module.exports = { createDir, createSchema };
