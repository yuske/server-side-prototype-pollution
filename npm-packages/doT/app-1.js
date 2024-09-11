'use strict';

var doT = require('dot');

Object.prototype.destination = "./"

const templates = doT.process({path: __dirname+'/views'});
var mytemplate = require(__dirname+'/views/mytemplate.js')