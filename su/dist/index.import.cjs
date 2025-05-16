/*jslint node: true, for: true */
"use strict";

const dist = '../dist/';
const NP = Number.prototype; 
var pp, pw, su, vm, vp, vw;

NP.methods = {vw:[]}; 
su = {
    O1: Object.keys
  , O2: Object.fromEntries
  , O3: Object.entries
  , O4: Object.create
  , O5: (obj) => {return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))}
  , O6: Object.assign
  , AP: Array.prototype
  , OP: Object.prototype
  , FP: Function.prototype
  , NP: Number.prototype
  , SP: String.prototype
  , JS: JSON.stringify
  , JP: JSON.parse
};
var {AP,SP,O1,O6} = su;
O6(vm=(0).methods, su), vw=vm.vw;

global.CHR = function CHR(ord, lower=false, base=65, smal=97) { return String.fromCharCode(((lower)?smal:base) + ord)}; 
global.ORD = function ORD(chr, lower=false, base=65, smal=97) { return  chr.charCodeAt(0)-((lower)?smal:base)};

SP.require = function(s)  {[this,s||0].require()};
AP.require = function()   {var v,s=this[0],p=this[1]; ((!p && (s.indexOf(':')>0))?[v=s.split(':'),s=v[0],p=v[1]][2]:p=s), vm[s] = require(p), pw([s, vm[s]])};
AP.each    = function(pa) {return(this.map((v) => (typeof pa == 'function')? pa(v):   pa[v]))}; 
NP.CHR     = function(f)  {return(CHR(this-1,f=false))};
SP.ORD     = function(f)  {return(ORD(this,  f=false))};
NP.pos     = function()   {return([Math.floor(this/9)+1,this%9+1])};
Math.sum   = (v)=>v.reduce((s,a)=>s+a,0);

vp = [], pp = (s)=>s.require(), pw = (v)=> {vw.push(v)};
'ansi,assert,beautify:js-beautify/js,colors:ansi-colors,consola,converter:hex2dec,cutil:class-utils,curry:lodash,diff:fast-array-diff,each:promise-each,eansi:ansi-escape-sequences,events,fs,funcloc:get-function-location,getSudoku:sudoku-gen,julian,listener:node-global-key-listener,lodash,minimist,moment,mouseEv:global-mouse-events,path,progress:cli-progress,readline,semver,sizeof:object-sizeof,solver:sudoku_solver,sudoku,thenify,unicsub:unicode-substring,util'.split(',').each(pp);
vm.beautify = vm.beautify.js, vm.curry=vm.curry.curry, vm.diff = {diff:vm.diff.diff, same:vm.diff.same, match:vm.assert.match}; vm.ansi.eansi= vm.eansi;
vm.GlobalKeyboardListener=vm.listener, vm.GkListener=vm.GlobalKeyboardListener; vm.moment.locale('de');

SP.requireLocal = function(p)  {p=p||dist; return(require(`${p}${this}`))};

vm.cursor  = `index.lists.cjs`  .requireLocal().cursor;
vm.em      = `index.emitter.cjs`.requireLocal().em;
vm.Emitter = `index.emitter.cjs`.requireLocal().Emitter;
vm.symbols = `index.symbols.cjs`.requireLocal();
vm.types   = `index.type.cjs`   .requireLocal();

O6(vm.solver, vm.getSudoku);
O6(vm.util,   vm.converter);
O6(vm.solver, vm.sudoku);
O6(vm.ansi.cursor, cursor);

vm.ansi.elements();
vm.solver.elements();
vm.util.elements();
vp = O1(vm); vm._= `(${vp.length}) ${vp.join()}`;
su.methods = vm; 
/* "(51) O1,O2,O3,O4,O5,O6,AP,OP,FP,NP,SP,JS,JP,
         ansi,assert,beautify,colors,consola,converter,cutil,curry,diff,each,eansi,events,fs,funcloc,
         getSudoku,julian,listener,lodash,minimist,moment,mouseEv,path,progress,readline,semver,sizeof,
         solver,sudoku,thenify,unicsub,util,GlobalKeyboardListener,GkListener,
         cursor,em,Emitter,symbols,types"
*/
su.elements();

module.exports = {...su};
module.exports.elements(); vm, vw;

if(require.main) {
  if(require.main.filename == __filename) {
    [{...su},{...su.methods}].map((v)=>
      cursor.relFileName(__filename, v, require.main.filename == __filename));
}}
