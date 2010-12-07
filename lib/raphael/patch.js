

module.exports = function (jsdom, domToHtml, overload) {

    var result = {};

    // hack hack hack
    var patch = result.textNode = function (doc, elem) {
        if (!elem) return elem;
        return overload.Watchable(function get(info) {
            var key = info.property, that = this;
            if (key === "getNumberOfChars") { // that's the reason
                return function () {
                    return elem.textContent.length;
                };

            } else if (key === "createElementNS" || key === "createElement") {
                return function () {
                    return patch(doc, elem[key].apply(that, arguments));
                };

            } else if (key === "appendChild") {
                return function (newChild) {
                    if (!newChild.__patched__)
                        newChild = patch(doc, newChild);
                    var r = elem.appendChild.apply(that, [newChild]);
                };

            } else if (key === "ownerDocument") {
                return doc();

            } if (key === "__patched__") {
                return true;

            } else if (   key === "body"
                       || key === "firstChild"
                       || key === "lastChild"
                       || key === "nextSibling"
                       || key === "parentElement"
                       || key === "parentNode"
                       || key === "previousSibling") {
                return patch(doc, elem[key]);


            } else if (key === "childNodes") {
                var res = [];
                for(var i=0,l=elem._childNodes.length;i<l;i++)
                    res.push(patch(doc, elem._childNodes[i]));
                return new jsdom.defaultLevel.NodeList(that, function () {
                    return res;
                });

            } else if (key === "innerHTML") {
                return domToHtml(this.ChildNodes, true);

            } else if (key === "outerHTML") {
                if (this != doc())
                    return domToHtml(this);

                var html = domToHtml(this.documentElement);
                if (this.doctype) {
                html = this.doctype.toString() + '\n' + html;
                }
                return html;

            } else return elem[key];
        });
    };

    result.document = function (doc) {
        var newdoc = patch(function () {return newdoc}, doc);
        return newdoc;
    };

    return result;
};


