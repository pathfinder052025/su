/*jslint node: true, for: true */
'use strict';

var {cursor} = require('../dist/index.lists.cjs');
var su       = require('../dist/index.import.cjs');
var {fs, path, minimist, ts, types} = su.methods;
var predir, txtPath, outPath, su;

predir  = path.normalize((txtPath=path.normalize(__dirname+'/../txt/'))+'/..');
outPath = path.normalize(predir+'/ouput/')

if(!fs.existsSync(predir)) throw('fail');

su = {
    txtBanner:  ts=predir+'/txt/seeds.data.txt'
  , txtOutput:  predir+'/output/seeds.newdata.cjs'
  , tbanner:    txtPath+'banner.data.txt'
  , tseeds:     txtPath+'seeds.data.txt'
  , toutput:    outPath+'seeds.newdata.cjs'

  , argv:       minimist(process.argv.slice(2))
  , isString:   types.isString
  , isFunction: types.isFunction
  , isArray:    types.isArray
  
  , array:      require(predir+'/dist/index.array.cjs')
  , data:       require(predir+'/dist/index.vars.cjs')
  , types:      require(predir+'/dist/index.type.cjs')
  , border:     require(predir+'/constants/seeds.data.border.cjs')
  , grids:      require(predir+'/constants/seeds.data.grids.cjs')
  , seed1:      require(predir+'/constants/seeds.data.v10.cjs')
  , seed2:      require(predir+'/constants/seeds.data.v40.cjs')
  , seedt:      fs.readFileSync(txtPath+'seeds.data.txt', {encoding:'utf8', flag:'r'}).split(/\r\n/)
  , log:        console.log 
};
su.elements();

module.exports   = su;
module.exports.elements();

if(require.main) {
  if(require.main.filename == __filename) {
    var files = [su.tseeds, su.tbanner];
    files.map((n) => (!fs.existsSync(n)? (()=>{throw new Error(`File ${n} not exists!`)})() :0));
  }
  process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
}