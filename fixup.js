const fs = require('fs');

fs.writeFileSync('./dist/cjs/package.json', JSON.stringify({
    type: 'commonjs'
}));

fs.writeFileSync('./dist/esm/package.json', JSON.stringify({
    type: 'module'
}));

function formatFile(path) {
    let file = fs.readFileSync(path).toString()

    file = file.replace(/(from\s+)(["'])(?!.*\.js)(\.?\.\/.*)(["'])/g, '$1$2$3.js$4');

    fs.writeFileSync(path, file);
}

function processFiles(baseFolder) {
    let items = fs.readdirSync(baseFolder);

    for (let item of items) {
        if (item.match(/\..+$/)) {
            if (item.endsWith('.js')) {
                
                formatFile(`${baseFolder}/${item}`);
            }

            continue;
        }

        try {
            processFiles(baseFolder + '/' + item);
        } catch (_) {}
    }
}

processFiles('./dist/esm')