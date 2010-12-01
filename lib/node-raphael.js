
var
    depdir = __dirname + "/../deps",
    _require = require('./raphael/require')(depdir);

var jsdom = _require('jsdom', 'jsdom/lib/jsdom'),
    vargs = _require('vargs', 'vargs/lib/vargs'),
    Vargs = vargs.Constructor;





var svg = exports.svg = {};


var check_raphael = function () {
    if (svg.raphael) return true;
    throw new Error("You have to load Raphael first."+
        "\nUse <module>.load.raphael([gRaphael modules], callback)");
};


exports.svg.generate = function (width, height) {
    check_raphael();
    var args = new Vargs(arguments);
    var win = jsdom.createWindow(jsdom.dom);
    var doc = win.document = jsdom.jsdom("<html><body></body></html>"),
        nav = win.navigator;
    doc.implementation.addFeature(
        "http://www.w3.org/TR/SVG11/feature#BasicStructure",
        "1.1");
    var paper = svg.raphael(win, doc, nav)(0, 0, width, height);
    args.callback(paper);
    return doc.body.firstChild.outerHTML;
};

exports.load = require('./raphael/loader')(depdir, vargs, svg);

