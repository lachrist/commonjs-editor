#!/usr/bin/env node

var Playground = require("./playground.js");

Playground(process.argv[2], {basedir:process.cwd()}, function (error, playground) {
  if (error)
    throw error;
  process.stdout.write("module.exports = "+JSON.stringify(playground, null, 2)+";\n");
});
