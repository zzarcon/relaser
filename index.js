#!/usr/bin/env node
var fs = require('fs');
var relaser = require('./lib/relaser');
var relaserJson = fs.readFileSync('./relaser.json');
var options = JSON.parse(relaserJson);
var version = process.argv[2] || 'patch';

relaser(version, options);