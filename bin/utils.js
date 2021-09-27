const fs = require('fs');
const childProcess = require('child_process');

const CURR_DIR = process.cwd();

function createProject(answers) {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/../templates/${projectChoice}`;

    const destination = `${CURR_DIR}/${projectName}`;
    fs.mkdirSync(destination);

    createDirectoryContents(templatePath, projectName);
    downloadNodeModules(destination);
}

function createDirectoryContents(templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);
  
    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
    
        if (stats.isFile() && file !== 'package-lock.json') {
            const contents = fs.readFileSync(origFilePath, 'utf8');

            // Rename
            if (file === '.npmignore') file = '.gitignore';
        
            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory() && file !== 'node_modules') {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            
            // recursive call
            createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
    });
}

function updateProjectName(name) {
    // Package.json
    
    // index.html title

}

/**
 * Download the dependencies.
 * 
 * @param destination 
 * @param depStrings 
 */
 function downloadNodeModules(destination) {
    const options = {cwd: destination};
    childProcess.execSync('npm i', options);
}

module.exports = { createProject }
