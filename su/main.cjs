#!/usr/bin/env node

const su = require('su');
module.exports = {...su};

if(require.main) {
  if(require.main.filename == __filename) {
    [['0',{...su}],['methods',{...su.methods}],['base',{...su.base}],['vars',{...su.vars}]].map((v)=>
      cursor.relFileName(`${__filename}(${v[0]})`, v[1], require.main.filename == __filename));
}};