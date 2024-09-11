const path = require('path');
var saker = require('saker');
const fs = require('fs');

Object.prototype['$saker_raw$'] = 1
Object.prototype.str = "<script>alert(1)</script>"

const templateString = fs.readFileSync(__dirname+'/views/template.html','utf8');

const template = saker.compile(templateString);

const model = {
    translate: function(text) {
        return text === 'Hello world' ? 'Bonjour le monde' : text;
    }
};

out = template.call({layout: null}, model);

console.log(out);
