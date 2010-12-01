
module.exports = function(depdir, vargs, svg) {

var fs = require('fs'),
    path = require('path'),
    Vargs = vargs.Constructor;

// helper

var capsle = function (code, args) {
    code = code || "";
    args = args || ["window", "document","navigator"];
    return "exports="+(function (__args__){__code__}).toString()
        .replace("__args__", args.join(",")).replace("__code__", code);
};


var checkAndReadFile = function (filename, callback) {
    path.exists(filename, function (exists) {
        if (exists) return fs.readFile(filename, callback);
        throw new Error("Cannot find file '" + filename +
        "' but it is hardly required.\nTry git submodules update --init "+
        "to get all dependencies.");
    });
};


// main


result = function (/*modules*/) {
    var args = new Vargs(arguments);
    if (result.debug) console.log("* loading raphael …");
    checkAndReadFile(depdir + '/raphael/raphael.js', function (err, rcode) {
        if (err)
            return args.callback(err);

        var code = [rcode];
        var end = function (err, gcode) {
            if (err)
                return args.callback(err);

            if (gcode)
                code.push(gcode);
            code.push("return Raphael");

            code = capsle(code.join(";"));
            var module = svg.raphael = process.compile(code, "patched-raphael");

            args.callback(null, module);
        };
        if (args.length)
            result.G(args.all,end);
        else end();
    });
};


result.G = function (modules) {
    var args = new Vargs(arguments);
    var code = [];
    modules = modules || [];
    if (args.length > 1)
        modules = args.all;
    else if (typeof modules === 'string')
        modules = [modules];

    if (modules)
        modules.unshift("raphael");
    var readModule = function (err, new_code) {
        if(err)
            return args.callback(err);

        var module = modules.shift();
        if (new_code)
            code.push(new_code);

        if (module) {
            if (result.debug) console.log("* loading","g."+module,"…");
            checkAndReadFile(depdir+'/g.raphael/g.'+module+'.js',readModule);
        }
        else
            args.callback(null, code.join(";"));
    };
    readModule();
};


result.debug = false;

return result;
};