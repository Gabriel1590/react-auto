const fs = require('fs');
const childProcess = require('child_process');
const { createSchema } = require('../../lib/utils');

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
  let locationOfSchema = 'router/ts/reach';
  const locationToWrite = `${location}/${name}`;
  createSchema(
    locationOfSchema,
    locationToWrite,
  );

  if (installDeps || rest.includes('--install')) {
    console.log('Installing @reach/router...');
    const options = { cwd: locationToWrite };
    childProcess.execSync('npm i @reach/router', options);
    childProcess.execSync('npm install @types/reach__router --save-dev', options);
  }

  if (fromUse) {
    fs.rmSync(`${locationToWrite}/App.tsx`);
    locationOfSchema = 'router/use/reach';
    createSchema(
      locationOfSchema,
      locationToWrite,
    );
  }
}

module.exports = { generate };
