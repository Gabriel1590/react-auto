const { createDir, createSchema } = require('../../lib/utils');

const CURR_DIR = process.cwd();

/**
 * Creates Directory if needed, copy schema and paste it inside the indicated location,
 * under the given name
 * @param {string} name
 * @param {string} location
 */
function generate(name, location) {
  createDir(`${CURR_DIR}/${location}`, name);
  const locationOfSchema = 'redux-component/ts';
  const locationToWrite = `${location}/${name}`;
  createSchema(
    locationOfSchema,
    locationToWrite,
    (content) => customizeComponent(content, name),
  );
}

function customizeComponent(content, name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  let modifiedContent = content;

  modifiedContent = modifiedContent.replace(/Action/g, `${capitalizedName}Action`);
  modifiedContent = modifiedContent.replace(/Reducer/g, `${capitalizedName}Reducer`);
  modifiedContent = modifiedContent.replace(/State/g, `${capitalizedName}State`);
  return modifiedContent;
}

module.exports = { generate };
