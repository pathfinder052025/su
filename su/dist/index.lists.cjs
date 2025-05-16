/*jslint node: true, for: true */
"use strict";

var ansi, assert, colors, eansi, O1, O2, O3, OP, SP, cursorinit;

ansi   = require(`ansi`);
eansi  = require('ansi-escape-sequences')
assert = require('assert')
colors = require('ansi-colors');

OP = Object.prototype;
OP.getPrototype = function()       { return(Object.getPrototypeOf(this)) }; 
OP.setPrototype = function(parent) { return(Object.setPrototypeOf(this, parent)) }; 
SP = String.getPrototype();

O1 = Object.keys;
O2 = Object.fromEntries;
O3 = Object.entries;

OP.elements = function() {
	var va = void 0, type = typeof this;
	if(type == 'object') {
		va = O1(this).sort().filter((s)=>(s!='_')); 
		va = this._ = `(${va.length}) ${va.join()}`;
	} else {
		va = O1(this).sort();
	}
	return (va);
};
String.prototype.cursor = SP.cursor = function() {return ansi(process.stdout)};

SP.setCursor = function() {
	var ca, pt;
	ca = ''.cursor(); 
	if(!global.cursor) global.cursor = ca;
	pt = cursor.getPrototype();
	ca = pt.ansi     = ansi;
	ca.ESC           = '\x1b';
	ca.colors        = colors;
	O1(eansi.cursor).map((n) => ca[n] = eansi.cursor[n]);
	ansi.eansi      = eansi;
	ca.clearScreen  = '\x1bc';
	ca.clearLine    = '\x1b[K';
	ca.store        = "\x1b[s";
	ca.restore      = "\x1b[u";
	ca.escapeColor  = (sa, nn=0) => {
		return eansi.format(sa,
			(nn==1)? ['grey',    'bg-black']
		  : (nn==2)? ['yellow',  'bg-black']
		  : (nn==3)? ['red',     'bg-black']
		  : (nn==4)? ['black',   'bg-grey' ]
		  : (nn==5)? ['white',   'bg-blue' ]
		  : (nn==6)? ['blue',    'bg-black']
		  :          ['black',   'bg-white'])
	};
	pt.gowrite = function(x,y,t,c=0){
		try {
			if(!console.isClock) return;
			(!c)?0: t=t.ec(c); 
			cursor.goto(x, y).write(t);
		} catch(e){}
	};
	pt.writeCursor = function(v) {
		cursor.goto(v.x, v.y).write(ca.clearLine).write(v.t);
	};
	pt.restoreCursor = function(n=1) {
		var s;
		if(n) {
			process.stdout.write(s=ansi.show);
			process.stderr.write(ansi.show);
		};
		return(s)
	};
	pt.clearScreen = function(n=1) {
		var s;
		if(n) {
			process.stdout.write(s=ansi.clearScreen+ansi.hide);
			process.stderr.write(ansi.hide);
		};
		return(s)
	};
	pt.setStdin = (handleInput) => {
		var pinput = process.stdin;
		pinput.resume();
		readline.emitKeypressEvents(pinput);
		if (pinput.isTTY) pinput.setRawMode(true);
		pinput.on('keypress', handleInput||(()=>{}));
		/* pinput.on('keypress', (k)=>cursor.gowrite(1,22,JS(k))); #!#*/
	};
	pt.clearLine = (col=0, row=0) => {cursor.goto(col, row).write(cursor.ansi.clearLine);};
	pt.drawLine  = (color, col, row, txt='', pv, tp) => {
		if(color[0].startsWith('S')){
			color = color.slice(1);
			(color  == 'SPACE')? [cursor.goto(col, row).write(' ')]:
			(color  == 'SOLVE')? [cursor.goto(col, row).write(txt)]:0;
		} else {
			(txt.length  > 1)? cursor.clearLine(col, row):0;
		  pv = color.slice(0,2);
		  tp = (pv=="fg")? 2:(pv=="bg")? 1:0;
		  (tp)? color = color.slice(3): 0;
		  cursor[['bg','bg','fg'][tp]][color]();
		  cursor.goto(col, row).write(`${txt}`);
		  cursor.reset();
		}
	};
	pt.convertToText = function(obj) {
		var sa, string = [], prop, va;
		var type = typeof(obj);
		var _convertToText = (obj) => {
		  if(typeof(obj) == `function`) return `()=>{}`; /*#!#[function]*/
		  cursor.convertToText.deep = cursor.convertToText.deep||0;
		  cursor.convertToText.deep++;
		  var rc = cursor.convertToText(obj);
		  cursor.convertToText.deep--;
		  return rc;
		};
		if(!obj || (obj == null)) obj = "null";
		if(obj == "") obj = `""`;
		if(cursor.convertToText.deep >= 3) { 
		  return `${obj}`; /*#!#[${typeof obj}]*/ 
		};
		if(type == "object") {
			if(Array.isArray(obj)) type = `array`;
			va = {object:{n:1, a:`{`, e:`}`}, array:{n:0, a:`[`, e:`]`}}[type];  
			if(!va.n) if(!obj.length) return([]);
			string.push(va.a);
			for (prop in obj) {
				string.push(prop, ":", _convertToText(obj[prop]), ", ");
			};
			string.push(va.e);
		} else if (type == "function") {
			string.push(obj.toString())
		} else {
			string.push(JSON.stringify(obj))
		};
		sa = string.join("");
		if(sa = "[object Object]") sa = "`[object Object]`";
		return sa;
	};
	pt.codeBeautify = function() {
		cursor.beautify(0);
		cursor.beautify(`cursor`);
		AP.beautify(`AP`);
		NP.beautify(`NP`);
		SP.beautify(`SP`);
		OP.beautify(`OP`);
	};
	pt.relFiles     = cursor.relFiles||{};
	pt.relFileName  = function(filename, data, out, deep) {
		var dirs, file, pa;
		pa   = filename.split(/\\/);
		file = pa.pop();
		dirs = [pa.pop(),pa.pop()].reverse().join(`\\`); 
		file = ["..","..",dirs,file].join(`\\`);
		if(out) {
			console.log(`${file}: ${O1(data).sort().join(',')}`);
			if(deep) O1(data).map((v) => console.log(O1(data[v])))
		}
		return (cursor.relFiles[`${file}`] = data.elements());
	};
	return cursor;
};

class CursorInit {
	get cursor() { return () => {
		global.cursor = global.cursor||SP.setCursor();
		return(cursor)
	}};
	get isCursor()      { return () => {return(cursor.proc && (typeof cursor.proc[0] == 'function'))}};
	set pmCursor(pa) 	{ var pb, pc, pd, si = cursor.proc[this.event], {parm, name} = si;
						  cursor.parm = pa;
						  if(parm) {
							// cursor.runTimer();
							[pb = O3(':frame.parm'.emitTimer()), pc = O3(parm), pd = O3(pa[1])];
							[pa = O2([...pb, ...pc, ...pd]), pa.name = name, cursor.parm = pa];
							[si.parm = cursor.parm];
						}};			
	get pmCursor() 	   	{ if(!global.cursor) global.cursor = this.cursor(); return(cursor)};
	get onCursor()     	{ return (fn) => {this.onCursor=fn; return this.emitCursor()}};
	get emitCursor()    { return ()   => {return(cursor.proc)}};
	set onCursor(fa)   	{ this.event = 0; this.pmCursor.proc = this.pmCursor.proc||[]; 
						  assert.equal(typeof fa, 'function');
						  this.pmCursor.proc[this.event] = fa;
						  this.pmCursor = [this.event, {func:fa.toString()}]};
	get rmCursor()	 	{ return () => {
							var va, vp;
							va = ':dataview'.emitTimer();
							vp = ':dataproc'.emitTimer();
							['dataview', 'dataproc'].emTimeSort();
							if(va.length) 
								va.map((v) => 'viewdata'.onTimer(v));
							if(vp.length) 
								cursor.proc = [vp];
						}};
	get offCursor() 	{ return () => {
							var va, vc, vi = this.emitCursor(); 
							'-dataview'.onTimer(va=':viewdata'.emitTimer());
							'-dataproc'.onTimer(vc=cursor.proc[0]);
							['viewdata'].emTimeSort();
							this.onCursor = ()=>{}; 
							if(vc.parm) cursor.proc[0].parm = vc.parm;
						}};
	get saveCursor()    { return (mode) => {(!mode)? this.offCursor(): this.rmCursor()}};
	get cursorFkt()     { return(['isCursor','onCursor','emitCursor','saveCursor'])}; 
	get ptype()         { return(cursor.getPrototype())}; 
	get init()          { this.onCursor(()=>{});
						  this.cursorFkt.map((n) => this.ptype[n] = this[n]);
						  this.cf = [O1(cursor).filter((n) => (typeof cursor[n] == 'function'))];			
						  cursor.elements();
						  return cursor;
						};
	constructor()       {this.init};
};
cursorinit = new CursorInit();
process.cursor = cursor;

module.exports = {cursor};
module.exports.elements();

if(require.main) {
  	cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
} 