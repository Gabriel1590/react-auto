const childProcess = require('child_process');
const { createDir, createSchema } = require('../../lib/utils');

const CURR_DIR = process.cwd();

const argvs = Array.from(process.argv).slice(1);
const [,, ...rest] = argvs;

/**
 * Creates Directory if needed, copy schema and paste it inside the indicated location,
 * under the given name
 * @param {string} name
 * @param {string} location
 * @param {boolean} installDeps
 */
function generate(name, location, installDeps = false) {
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

  if (installDeps || rest.includes('--install')) {
    console.log('Installing react-redux and @reduxjs/toolkit...');
    const options = { cwd: locationToWrite };
    childProcess.execSync('npm i react-redux @reduxjs/toolkit', options);
    childProcess.execSync('npm i @types/react-redux --save-dev', options);
  }
}

module.exports = { generate };
