const childProcess = require('child_process');
const fs = require('fs');
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
 * @param {boolean} fromUse
 */
function generate(name, location, installDeps = false, fromUse = false) {
  const baseDir = `${CURR_DIR}/${location}/${name}`;

  createDir(baseDir, 'redux');
  let locationOfSchema = 'redux-config/ts';
  let locationToWrite = `${location}/${name}/redux`;
  createSchema(
    locationOfSchema,
    locationToWrite,
  );

  createDir(baseDir, 'hooks');
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

  if (fromUse) {
    fs.rmSync(`${baseDir}/index.tsx`);
    locationOfSchema = 'redux-config/use';
    locationToWrite = `${location}/${name}`;
    createSchema(
      locationOfSchema,
      locationToWrite,
    );
  }
}

module.exports = { generate };
