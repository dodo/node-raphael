# node-raphael

using the beatiful SVG library [Raphaël](http://raphaeljs.com) on [node.js](http://nodejs.org/) to generate svg-data.

## Features

* static svg generation with raphael

## Installation with git

    git clone https://github.com/dodo/node-raphael.git
    cd node-raphael
    git submodules update --init
    cd deps/node-overload
    make

## Motivation

NIH - not invented here ...
srsly .. i want to generate some good looking charts without using javascript on client side (because this is lame for none-interactive images)

## Dependencies

* [jsdom](https://github.com/tmpvar/jsdom)
* [raphael](https://github.com/DmitryBaranovskiy/raphael)
* [g.raphael](https://github.com/DmitryBaranovskiy/g.raphael)
* [vargs](https://github.com/cloudhead/vargs)
* [node-overload](https://github.com/bmeck/node-overload)

## Usage

    var raphael = require('node-raphael');

First you need to load the raphael module(s):

    raphael.load(function (err, raphael_module) { … });

you can use as well the shorter from:

    raphael.load(function (err) { … }); // the module is saved in raphael.svg.raphael

if you plan to use [gRaphaël](http://g.raphaeljs.com) you can simply add the different modules as arguments:

    raphael.load("pie", "bar", function (err) { … });

or manually (not recommented):

    raphael.load.G("pie", "bar", function (err) { … }); // WARNING only returns code

# Getting SVG

    raphael.svg.generate(width, height, function draw(paper) { … });

## Example

SVG Server with [Connect](https://github.com/senchalabs/connect.git):

 * https://github.com/dodo/node-raphael/example/server.js

## TODO

* More documentation
* tests
