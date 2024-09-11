const Hamlet = require('hamlet').hamlet;

templateString = `<body>
<p>Some paragraph.
<ul>
    <li>Item 1
    <li>Item 2
<.foo>
    <span#bar data-attr=#{foo}>baz # this is a comment`
    

Object.prototype.variable = "x;\nglobal.process.mainModule.require('child_process').exec('bash -c \"sleep 10\"');\nvar it"

try {
    Hamlet(templateString, {foo:'f'})
} catch (e) {
    ;
}
