// -*- js -*-

var fs = require('fs'),
	cssmin = require('../cssmin'),
	util = require('util'),
	arg = process.argv.slice(2);

function squeeze_out(css_in) {
	process.stdout.write(cssmin(css_in) );
}

if (arg.length) {
	arg = arg[0].replace(/^(-)+/,'');
	switch(arg) {
		case 'h' : showHelp();
		break;
		case 'help' : showHelp();
		break;
		default :
		fs.readFile( arg, "utf8", function(err, css_in) {
			if (err) {
				util.puts("Invalid file : "+ arg);
				process.exit(1);
			}
			else {
				squeeze_out(css_in);
			}
		} );
	}
}
else {
	var stdin = process.openStdin();
	stdin.setEncoding("utf8");
	var css_in = "";
	stdin.on("end", function() { squeeze_out(css_in) });
	stdin.on("data", function(chunk) { css_in += chunk });
}

function showHelp() {
	util.puts("Usage: node ./bin/cssmin [options] [<file>]");
	util.puts("\nIf no file is specified, assume stdin for input.");
	util.puts("\nOptions:");
	util.puts("\t--help, -h  Print usage info");
}
