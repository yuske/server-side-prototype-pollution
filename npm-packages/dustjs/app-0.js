var dust = require('dustjs-linkedin');

Object.prototype.title = "ARBITRARY VALUE HERE :>";

var tmpl = dust.compile("{#names}{title} {name}{~n}{/names}", "array");
dust.loadSource(tmpl);

dust.render("array", { title: "Sir", names: [ { name: "Moe" }, { name: "Larry" }, { name: "Curly" } ] }, function(err, out) {
    console.log(out)
});