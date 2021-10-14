const childProcess = require('child_process');
const { createDir, createSchema } = require('../../lib/utils');

const argvs = Array.from(process.argv).slice(1);
const [,, ...rest] = argvs;

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
  const locationOfSchema = 'redux-slice/ts';
  const locationToWrite = `${location}/${capitalizedName}`;
  createSchema(
    locationOfSchema,
    locationToWrite,
    (content) => customizeComponent(content, capitalizedName),
  );

  if (rest.includes('--install')) {
    console.log('Installing react-redux and @reduxjs/toolkit...');
    const options = { cwd: locationToWrite };
    childProcess.execSync('npm i react-redux @reduxjs/toolkit @types/react-redux', options);
  }
}

function customizeComponent(content, name) {
  let modifiedContent = content;

  modifiedContent = modifiedContent.replace(/\b(State)\b/g, `${name}State`);
  modifiedContent = modifiedContent.replace(/\b(Slice)\b/g, `${name}Slice`);
  modifiedContent = modifiedContent.replace(/reducer/, name);
  return modifiedContent;
}

module.exports = { generate };
