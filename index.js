var fs = require('fs')
  , vm = require('vm')
  , jsdom = require('jsdom')

const { JSDOM } = jsdom;

var script = loadRaphael()
module.exports.generate = function generate(width, height, callback) {
    var doc = new JSDOM('<html><body></body></html>')
        win = doc.window
    var nav = win.navigator
    win.document = doc

    // doc.implementation.addFeature(
    //     "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
    var paper = extractRaphael(win, win.document, nav)(0, 0, width || 42, height || 42)

    if (callback) callback(paper, win.document, nav)
    return win.document.body.firstChild && win.document.body.firstChild.outerHTML || ""
}

function loadRaphael() {
    var filename = require.resolve('raphael/raphael')
    var code = fs.readFileSync(filename)
    code = code.toString('utf-8').replace("})(this);", "})(this);eve = window.eve;") // HACK
    code = "(function () {" + code + "}).call(window)"
    return vm.createScript(code, filename)
}

function extractRaphael(win, doc, nav) {
    win.Raphael = {} // to get Raphael to overwrite this one and fill the _engine
    script.runInNewContext({
        window:    win,
        document:  doc,
        navigator: nav,
        console:   console,
        setTimeout: setTimeout,
        setInterval: setInterval,
    })
    return win.Raphael
}
