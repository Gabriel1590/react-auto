const fs = require('fs');

/**
 * @param {string} location
 * @param {string} name
 */
function createDir(location, name) {
  const writeDirPath = `${location}/${name}`;
  const dirExists = fs.existsSync(writeDirPath);

  if (!dirExists) {
    fs.mkdirSync(writeDirPath);
  } else if (fs.readdirSync(writeDirPath)[0]) {
    throw new Error(`Error: Directory ${name} is not empty`);
  }
}

module.exports = { createDir };
