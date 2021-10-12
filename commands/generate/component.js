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
  const locationOfSchema = 'component/ts';
  const locationToWrite = `${location}/${name}`;
  createSchema(
    locationOfSchema,
    locationToWrite,
    (content) => customizeComponent(content, name),
  );
}

function customizeComponent(content, name) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  return content.replace(/Component/g, `${capitalizedName}Component`);
}

module.exports = { generate };
