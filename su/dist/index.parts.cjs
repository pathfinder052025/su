/*jslint node: true, for: true */
"use strict";
// SP:     chrElement,convertChr,convertOrd,countNumber,escapeColor,getSuName,number,ordElement,readSigns
// AP:     chrElement,joinNumber,logPuzzle,numbers,numbersSu,procBar,procTime,startTimer,timePuzzle,unique,unique2,wait
// cursor: ansi,clearLine,clearScreen,drawLine,onTime,setStdin
// solver: Grid,Solver,getSudoku,makepuzzle,ratepuzzle,solvepuzzle
// files:  inpBorder,inpGrids,inpSeed1,inpSeed2,outSeeds,fktSeeds,txtBanner,txtSeeds

require('./index.lists.cjs');

var fs        = require('fs')
var path      = require('path')
var assert    = require('assert');
var julian    = require('julian');

var predir, distPath, txtPath, outPath, constPath;

predir    = path.normalize(path.normalize(__dirname+'/..'));
txtPath   = path.normalize(predir+'/txt/')
distPath  = path.normalize(predir+'/dist/')
outPath   = path.normalize(predir+'/ouput/')
constPath = path.normalize(predir+'/constants/')

if(!fs.existsSync(predir)) throw('fail');

var array     = require(distPath+'index.array.cjs');
var base      = require(distPath+'index.base.cjs');
var types     = require(distPath+'index.type.cjs');
var _Emitter  = require(distPath+'index.emitter.cjs');
var {symbols} = require(distPath+'index.symbols.cjs');

var txtBanner = txtPath+'banner.data.txt';
var txtSeeds  = txtPath+'seeds.data.txt';

var inpBorder = constPath+'seeds.data.border.cjs';
var inpGrids  = constPath+'seeds.data.grids.cjs';
var inpSeed1  = constPath+'seeds.data.v10.cjs';
var inpSeed2  = constPath+'seeds.data.v40.cjs';
var outSeeds  = outPath  +'output/seeds.newdata.cjs';
var fktSeeds  = distPath+'index.newdata.cjs';

var border    = require(inpBorder);
var grids     = require(inpGrids);
var seed1     = require(inpSeed1);
var seed2     = require(inpSeed2);
var ts = path.normalize(txtSeeds);
var seedt     = fs.readFileSync(txtSeeds, {encoding:'utf8', flag:'r'}).split(/\r\n/);
var banner    = txtBanner.readSigns();
var SP        = String.prototype;
var sources   = {border, grids, seed1, seed2, seedt, banner};
sources._     = sources.elements();

class Src{
	constructor() {
		this.cursor = ``.cursor();
		this.em = new base.methods.Emitter;
  };
  init() {
    this.em.on( `write`, src.cwrite)
		this.em.on(`clearL`, src.clearL)
		this.em.on(`clearS`, src.clearS);
		this.em.on( `reset`, src.reset);
	};
	get cwrite()    {return (x,y,s) => {return s.stdwrite(x,y)}}
	get clearL()    {return (x,y)   => {src.cursor.clearLine(x,y)}};
	get clearS()    {return ()      => {src.cursor.clearScreen()}};
	get reset()     {return ()      => {src.cursor.reset()}};
	get timer()     {return src.cursor.timer};
}
var src = new Src();

function su() {
  function so(array) {
    var {sources,wa,data,fo,vars}  = array;
    var {border,grids,banner} = sources;
    var {seed1,seed2,seedt}   = sources;
    var {argv,methods}        = base;
    var {solver,em,Emitter}   = methods;
    var {vout,vend,vinp}      = fo;
    var {fb, fd}              = {fb:border.frameBorder, fd:border.frameData};
    data.methods              = methods;
    var {O1,O2,O3,O4,O5,O6,AP,FP,NP,OP,SP,JS,JP,w1,w3,vp} = data;
    return {O1,O2,O3,O4,O5,O6,AP,FP,NP,OP,SP,JS,JP,Emitter,w1,w3,vp,argv,methods,border,grids,banner,fb,fd,em
          ,seed1,seed2,seedt,solver,sources,src,wa,data,fo,vars,vout,vend,vinp};
  };
  
  var {vnew,vsm1,vsm2,vout,vinp,vend,vbnr} = {
      vnew:  new Array(81).fill('-').join(``)
    , vsm1:  '41--75-----53--7--2-36-81--7-9--25-1-3--9-47--2-1-7---6587--9-----26-8--1925---47'
    , vsm2:  '.....1....2......86912............141.25.6..38...2.5.6..5......73.........63194.5'
    , vsm3:  '-4-2-1--6-------28-----31---3-9------641----79825--4---93-1---5-5--69--4--1--48--'
    , vout:  [
        '/*jslint node: true, for: true */'
      , '\'use strict\';'
      , '//     file: {file}'
      , '//    count: {count}'
      , '// creation: {ptime}'
      , '{banner}'
      , 'const seeds = ['
    ].join('\r\n')
    , vinp:  [
        '{'
      , '       first: \'{first}\','
      , '        last: \'{last}\','
      , '      puzzle: \'{puzzle}\','
      , '    solution: \'{solution}\','
      , '  difficulty: \'{difficulty}\','
      , '        time: {time},'
      , '  resolution: {counter}'
      , '},'
    ].join('\r\n')
    , vend:  [
      , '];'
      , 'module.exports = seeds;'
    ].join('\r\n')
    , vbnr:  `/\*${`\r\n`}${sources.banner.ATEXT}${`\r\n`}*/`
  }
  vout = vout.replace(/{ptime}/, [].procTime()).replace(/{banner}/, vbnr)

  var {SP,ansi,argv,assert,box,cursor,delay,diff,duration,eansi,em,Emitter,each,events,fs,GkListener,julian,lodash,solver,path,progress,readline,util,unicsub} = base;
  var {frameBorder,frameData} = border;

  SP.banner = function(){return sources.banner[this]}
  
  var arrData = {};
  "data".get(arrData, (array) => {
    var {va,vg,vp,w0,w1,w2,w3,w4,wa,wb,wg,wr,ws,wz} = array.data;
    SP.vars = {va,vg,vp,w0,w1,w2,w3,w4,wa,wb,wg,wr,ws,wz};
    return(SP.vars);
  });

  const {floor}   = Math;
  array.methods   = {ansi,argv,assert,cursor,delay,diff,duration,eansi,em,Emitter,each,events,floor,fs,GkListener,julian,lodash,solver,path,progress,readline,util,unicsub};
  array.fb        = frameBorder
  array.fd        = frameData;
  array.fo        = {vnew,vsm1,vsm2,vout,vinp,vend,vbnr};
  array.sources   = sources;
  array.grids     = grids;
  array.types     = types;
  array.seeds     = {seed1, seed2, seedt};
  array.symbols   = symbols;
  array.files     = {txtBanner,txtSeeds,inpBorder,inpGrids,inpSeed1,inpSeed2,outSeeds,fktSeeds};
  array.wa        = [vnew,vsm1,vsm2];
  array.box       = box; 
  array.em        = em;
  array.wa.source = array.fo;
  array.vars      = arrData.data(array);
  array.vars      .elements();
  array.wb        = so(array);
  array.wb        .elements();
  array           .elements();
  array.methods   .elements();
  array.files     .elements();
//  '_pos'.get(array.fb.__proto__, (n)=>{return{x:n%9, y:Math.floor(n/9)}});
//  '_pos'.set(array.fb.__proto__, (n)=>{});
  return array;
};

module.exports = su();
module.exports.elements();
// "(19) area,box,data,em,fb,fd,files,fo,grids,large,methods,seeds,smal,sources,symbols,types,vars,wa,wb"
module.exports.wb;
module.exports.wb.vars;
module.exports.wa, module.exports.wb

if(require.main)
    process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
