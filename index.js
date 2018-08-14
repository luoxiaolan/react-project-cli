#!/usr/bin/env node

"use strict";
var fs = require('fs');
var path = require('path');

var currentDir = process.cwd();
var tmpDir = path.join(__dirname, '/template');

var pkg = require('./package.json');

var options = {
    info: {
        display: true,
        description: 'INFO    : ' + pkg.description + '\n' +
        'Author  : ' + pkg.author + '\n' +
        'Homepage: ' + pkg.homepage
    },
    usage: {
        display: true,
        description: '\n Usage: react-project [-v] [-h] [option <value>]\n'
    },
    fields: {
        display: true,
        description: ' Option    | Description'
    },
    n: {
        display: true,
        description: ' <name>      Assign a application name.(default: app)'
    },
    v: {
        display: true,
        description: ' -v          Display the version of react-redux-create.'
    },
    h: {
        display: true,
        description: ' -h          Display help.'
    },
    version: {
        display: false,
        description: pkg.name + ' Ver: ' + pkg.version
    }
}

function displayOption(msg) {
    console.log(msg.description);
}

function displayAllOptions() {
    for (var key in options) {
        if (options[key].display) {
            displayOption(options[key]);
        }
    }
}

function readDir(tmpDir, dist) {
    try {
        fs.mkdirSync(dist);
    } catch (e) {
        console.log(e.message);
    }

    var list = fs.readdirSync(tmpDir);

    list.forEach(function (item) {
        if (fs.statSync(tmpDir + '/' + item).isDirectory()) {
            readDir(tmpDir + '/' + item, dist + '/' + item);
        } else {
            let buffStr = fs.readFileSync(path.join(tmpDir, item), 'utf-8');
            fs.writeFileSync(path.join(dist, item), buffStr ,{flag:'w+'});
        }
    });
}

function exec(argv) {
    console.log(argv);
    if (argv[2] == '-h' || argv.length == 2) {
        displayAllOptions();
        process.exit();
    } else if (argv[2] == '-v') {
        displayOption(options['version']);
        process.exit();
    } else if (argv[2] === 'add' && argv.length === 4) {
        let path = '/src/pages/' + argv[3];
        console.log(path);
        console.log('add page' + argv[3]);
        readDir(tmpDir + '/src/pages/demo/', currentDir + path);
    } else if (argv[2] === 'init') {
        readDir(tmpDir, currentDir);
    } else {
        var distDir = currentDir + '/' + argv[2];
        readDir(tmpDir, distDir);
    }

    console.log('Create successfully!');
}

exec(process.argv);

process.exit();
