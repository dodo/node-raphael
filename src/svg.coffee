fs = require('fs')
vm = require('vm')
jsdom = require('jsdom')

class SVG
    constructor: () ->
        filename = require.resolve('raphael/raphael')
        code = fs.readFileSync(filename)
        code = code.toString('utf-8').replace "})(this);", "})(this);eve = window.eve;" # HACK
        code = "(function () {#{code}}).call(window)"
        @_script = vm.createScript(code, filename)

    _raphael: (win, doc, nav) ->
        win.Raphael = {} # to get Raphael to overwrite this one and fill the _engine
        ctx =
            window:    win
            document:  doc
            navigator: nav
            console:   console
            setTimeout: setTimeout
            setInterval: setInterval
        @_script.runInNewContext(ctx)
        win.Raphael

    generate: (width, height, callback) ->
        win = jsdom.createWindow(jsdom.dom)
        doc = win.document = jsdom.jsdom("<html><body></body></html>")
        nav = win.navigator
        doc.implementation.addFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")

        paper = @_raphael(win, doc, nav)(0, 0, width or 42, height or 42)
        callback?(paper)
        doc.body.firstChild?.outerHTML or ""



module.exports = new SVG()
module.exports.SVG = SVG

