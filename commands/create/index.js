const fs = require('fs');
const inquirer = require('inquirer');
const childProcess = require('child_process');

const CURR_DIR = process.cwd();

async function promp() {
  const TEMPLATE_CHOICES = fs.readdirSync(`${__dirname}/../../templates/apps`);

  const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: TEMPLATE_CHOICES,
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Project name:',
      validate(input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        return 'Project name may only include letters, numbers, underscores and hashes.';
      },
    },
  ];

  try {
    const answers = await inquirer.prompt(QUESTIONS);
    createProject(answers);
  } catch (error) {
    console.log(error);
  }
}

function createProject(answers) {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];
  const templatePath = `${__dirname}/../../templates/apps/${projectChoice}`;

  const destination = `${CURR_DIR}/${projectName}`;
  fs.mkdirSync(destination);

  createDirectoryContents(templatePath, projectName);
  updateProjectName(projectName, destination);
  downloadNodeModules(destination);
}

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    let fileName = file;
    const origFilePath = `${templatePath}/${fileName}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile() && fileName !== 'package-lock.json') {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      // Rename
      if (fileName === '.npmignore') fileName = '.gitignore';

      const writePath = `${CURR_DIR}/${newProjectPath}/${fileName}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory() && fileName !== 'node_modules') {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${fileName}`);

      // recursive call
      createDirectoryContents(`${templatePath}/${fileName}`, `${newProjectPath}/${fileName}`);
    }
  });
}

function updateProjectName(name, destination) {
  // Package.json
  const packageJsonPath = `${destination}/package.json`;
  let packageJson = fs.readFileSync(packageJsonPath, 'utf8');
  const [start,, ...rest] = packageJson.split('\n');
  packageJson = [start, `  "name": "${name}",`, ...rest].join('\n');

  fs.unlinkSync(packageJsonPath);
  fs.writeFileSync(packageJsonPath, packageJson);

  // index.html title
  const publicIndexHtmlPath = `${destination}/public/index.html`;
  const publicIndexHtml = fs.readFileSync(publicIndexHtmlPath, 'utf8');

  fs.unlinkSync(publicIndexHtmlPath);
  fs.writeFileSync(publicIndexHtmlPath, publicIndexHtml.replace('%TITLE%', name.toUpperCase()));
}

/**
 * Download the dependencies.
 *
 * @param destination
 * @param depStrings
 */
function downloadNodeModules(destination) {
  const options = { cwd: destination };
  childProcess.execSync('npm i', options);
}

promp();
