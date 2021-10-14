const { createDir, createSchema } = require('../../lib/utils');

const CURR_DIR = process.cwd();

/**
 * Creates Directory if needed, copy schema and paste it inside the indicated location,
 * under the given name
 * @param {string} name
 * @param {string} location
 */
function generate(name, location) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  createDir(`${CURR_DIR}/${location}`, capitalizedName);
  const locationOfSchema = 'redux-component/ts';
  const locationToWrite = `${location}/${capitalizedName}`;
  createSchema(
    locationOfSchema,
    locationToWrite,
    (content) => customizeComponent(content, capitalizedName),
  );
}

function customizeComponent(content, name) {
  let modifiedContent = content;

  modifiedContent = modifiedContent.replace(/Action/g, `${name}Action`);
  modifiedContent = modifiedContent.replace(/Reducer/g, `${name}Reducer`);
  modifiedContent = modifiedContent.replace(/State/g, `${name}State`);
  return modifiedContent;
}

module.exports = { generate };
