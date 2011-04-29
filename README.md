# node-raphael

using the beatiful SVG library [Raphaël](http://raphaeljs.com) on [node.js](http://nodejs.org/) to generate svg-data.

## Features

* static svg generation with raphael

## Installation

    npm install node-raphael

## Motivation

NIH - not invented here ...
srsly .. i want to generate some good looking charts without using javascript on client side (because this is lame for none-interactive images)

## Usage

    var raphael = require('node-raphael');
    raphael.generate(width, height, function draw(paper) { … });

## Example

SVG Server with [Raphaël Logo](http://raphaeljs.com/gear.html):

 * https://github.com/dodo/node-raphael/example/server.js

## TODO

* More documentation
* tests
