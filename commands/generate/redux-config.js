const { createDir, createSchema } = require('../../lib/utils');

const CURR_DIR = process.cwd();

/**
 * Creates Directory if needed, copy schema and paste it inside the indicated location,
 * under the given name
 * @param {string} name
 * @param {string} location
 */
function generate(name, location) {
  createDir(`${CURR_DIR}/${location}/${name}`, 'redux');
  let locationOfSchema = 'redux-config/ts';
  let locationToWrite = `${location}/${name}/redux`;
  createSchema(
    locationOfSchema,
    locationToWrite,
  );

  createDir(`${CURR_DIR}/${location}/${name}`, 'hooks');
  locationOfSchema = 'redux-config/hooks';
  locationToWrite = `${location}/${name}/hooks`;
  createSchema(
    locationOfSchema,
    locationToWrite,
  );
}

module.exports = { generate };
