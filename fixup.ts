import * as path from 'path';
import * as fs from 'fs';

// Our package.json does not include `"type": "module"`, which is required for ESM
// packages to work. So we need to manually add this after compiling.
fs.writeFileSync(path.join(__dirname, './dist/esm/package.json'), JSON.stringify({
  type: 'module',
}));

fs.writeFileSync(path.join(__dirname, './dist/cjs/package.json'), JSON.stringify({
  type: 'commonjs',
}));

const formatFile = (filePath: string): void => {
  const fileContent = fs.readFileSync(filePath)
    .toString()
    .replace(/(from\s+)(["'])(?!.*\.js)(\.?\.\/.*)(["'])/g, '$1$2$3.js$4');

  fs.writeFileSync(filePath, fileContent);
};

const processFiles = (baseFolder: string): void => {
  const fileAndFolderNames = fs.readdirSync(baseFolder);

  fileAndFolderNames.forEach((fileOrFolderName) => {
    if (fileOrFolderName.match(/\..+$/)) {
      // This is a file.
      if (fileOrFolderName.endsWith('.js')) {
        formatFile(`${baseFolder}/${fileOrFolderName}`);
      }
    } else {
      // This is a folder.
      processFiles(`${baseFolder}/${fileOrFolderName}`);
    }
  });
};

// We also have to add explicit `.js` file extensions for our ESM imports.
processFiles('./dist/esm');
