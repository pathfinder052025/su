/*jslint node: true, for: true */
"use strict";

var su  = require('./dist/index.import.cjs');
su.base = require('./dist/index.base.cjs');
su.vars = require('./dist/index.timer.cjs');

module.exports = {...su};
module.exports.elements();

if(require.main) {
  if(require.main.filename == __filename) {
    [{...su},{...su.methods}].map((v)=>
      cursor.relFileName(__filename, v, require.main.filename == __filename));
}}; 
