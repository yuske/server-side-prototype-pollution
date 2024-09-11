// Tangular custom helper feature
const path = require('path');
const fs = require('fs');
require('tangular');


Object.prototype["name"] = "<script>alter(1)</script>"

var template = Tangular.compile('Hello {{name}} and {{name | raw}}!');

var output = template({ name: 'Peter' });

console.log(output);