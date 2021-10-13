const { createSchema } = require('../../lib/utils');

/**
 * Creates Directory if needed, copy schema and paste it inside the indicated location,
 * under the given name
 * @param {string} name
 * @param {string} location
 */
function generate(name, location) {
  const locationOfSchema = 'router/ts/reach';
  const locationToWrite = location;
  createSchema(
    locationOfSchema,
    locationToWrite,
  );
}

module.exports = { generate };
