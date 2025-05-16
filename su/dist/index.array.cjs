/*jslint node: true, for: true */
"use strict";

require('../dist/index.lists.cjs');

var sushi = () => {
	var data = require('../dist/index.vars.cjs');
	var {_,n,nn,n1,n2,n3,s,w,v  
		, AP,CHR,JP,JS,FP,O1,O2,O3,O4,O5,O6,OP,ORD,NP,PP,SP
		, argv,border,debug,grids,input,labels,log
		, jo,js,n1,n2,n3,sp,v2,v3,va,vd,verr,vg
	    , vl,vm,vn,vp,w0,w1,w2,w3,w4,wa,wr,ws,wz} = data;

	var vData = {
		  _:      _      = {}
		, debug:  debug  = 1
		, border: border = require('../constants/seeds.data.border.cjs')	
		, grids:  grids  = require('../constants/seeds.data.grids.cjs')
		, labels: labels = ["Started","Runing"]
		, input:  input  = process.stdin
		, log:    log    = debug? console.log: (() =>{})
		, verr:   verr   = []
		, pmini:  argv   = require('minimist')
		, argv:   argv   = argv(process.argv.slice(2))

		, AP:  AP  = Array.prototype
		, FP:  FP  = Function.prototype
		, NP:  NP  = Number.prototype
		, SP:  SP  = String.prototype
		, OP:  OP  = Object.prototype
		, PP:  PP  = void 0

		, CHR: CHR = (ord, lower=false, base=65, smal=97) => { return String.fromCharCode(((lower)?smal:base) + ord);}
		, ORD: ORD = (chr, lower=false, base=65, smal=97) => { return  chr.charCodeAt(0)-((lower)?smal:base);}
		
		, JP:  JP  = JSON.parse
		, JS:  JS  = JSON.stringify
		, O1:  O1  = Object.keys
		, O2:  O2  = Object.fromEntries
		, O3:  O3  = Object.entries
		, O4:  O4  = Object.create
		, O5:  O5  = (obj) => {return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))}
		, O6:  O6  = Object.assign
		, js:  js  = (v,mo=0)  => {return (!mo)? v: JS(v)}
		, jo:  jo  = (s,c=",") => {return s.join(c)}
		, sp:  sp  = (s,c=",") => {return s.split(c)}

		, vn:  vn  = new Array(81).fill(0).map(() => ++n2)
		, vm:  vm  = new Array(81).fill(0).map(() => n3++)
		, vl:  vl  = vn.slice(0,9)
		, w0:  w0  = [vl, vl.map((n)=> CHR(n-1))]
		, w1:  w1  = [v2=[...([1,2,3].map((m) => [n=(m-1)*3,      `${[CHR(n).repeat(3)+CHR(n+1).repeat(3)+CHR(n+2).repeat(3)]}`.repeat(3)][1]).join(""))]
				     ,v3=[...([1,2,3].map((n) => [n1=((n-1)*3)+1, `${[n1,n1+1,n1+2]},`.repeat(3)][1]).join("").repeat(3)).replace(/\,/g,"")]
				     ,vn.map((n) => `${v2[n-1]}${v3[n-1]}`)][2]
		, w2:  w2  = [w=[], vl.map((n) => vl.map((m) => [n, m])).map((v)=>w=w.concat(v)), w][2]
		, w3:  w3  = [w={}, vn.map((n)=> w[w1[n-1]]=n), w][2]
		, w4:  w4  = O1(w3).sort()
		, vd:  vd  = `${vn.map(() => `-`).join(``)} `
		, vk:        [[...vd],v=[]][0]
		, wa:  wa  = O2(v[0]=w0[1].map((v) => [v, w4.filter((s) => s[0]==v).map((v) => w3[v])]))
		, wz:  wz  = O2(v[1]=vl.map((n) => [`Z${n}`, vl.map((m) => (n-1)*9+m)]))
		, ws:  ws  = O2(v[2]=vl.map((m) => [`S${m}`, vl.map((n) => (n-1)*9+m)])) 
		, wb:        O2(v[3]=vl.map((n) => [`R${n}`, v[0][n-1][1]]))
		, wr:        (v[4]=vm.map((n) => 
			           [w=[].concat(wa[w1[n][0]], wz[`Z${w2[n][0]}`], ws[`S${w2[n][1]}`])
			          ,w=O3(O2(w.map((n) => [w1[n-1],n]))).sort().map((m) => m[1]), [w1[n], w]][2]))
		, vp:  vp  = O2([].concat(v[0],v[1],v[2],v[3],v[4]))
		, vg:  vg  = [w={col:[5,7,9, 13,15,17, 21,23,25],row:[5,6,7, 9,10,11, 13,14,15],first:[5,5],last:[25,15],pos:{x:0,y:0},nv:0}
		 	  	      ,w.vg=(new Array(81).fill(0)
			  	      ,vm.map((n) => [w.row[w2[n][0]-1], w.col[w2[n][1]-1], w.nv++]))
			  	      ,w.vg=w.vg.map((v) => [v[0],v[1]]), w][3]
		, wg:        O2(vm.map((n) => [w1[n], [w2[n], vg.vg[n]]]).sort())
	 	, va:  va  = [w={}, [..."SZ"].map((s) => [1,4,7].map((n) => [
				     [w[s+n]     = [s+(n+1),s+(n+2)]], 
				     [w[s+(n+1)] = [s+n,    s+(n+2)]], 
				     [w[s+(n+2)] = [s+n,    s+(n+1)]] ])), w][2]

		, area: 	[O2(va=vm.map((n) => [
				 	 w=[].concat(va[`Z${w2[n][0]}`],va[`S${w2[n][1]}`]),  
					 w=[w1[n],[JS(w).replace(/[\"\[\]]/g,""),JS([0,1,2,3].map((n)=>vp[w[n]]))]]][1]))
					,va=va.map((n)=> [n[0],eval(n[1][1])])][0]
		, smal: 	(grids)? JS(grids.num.join(",").split("X"))  :0
		, large:	(grids)? JS(grids.rng.join(",").split("XX")) :0
		, symbols: 	(grids)? grids.UNICODE_SYMBOLS :0
		, puzzles:  void 0

		, vNum: {N:`-`,a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9}
		, lst:  {pos:0, min:1, max:1, entry:{}, entrys:{}, key:[], name:"", dir:true}
		, cbb:  {}
		, cpl:  {}
		, cpp:  {}
		, csp:  void 0
		, fb:   {}
		, fd:   {}
		, nn:   0
		, n1:   0
		, n2:   0
		, n3:   0
		, sa:   ""
		, sema: {}
		, semc: {}
		, vsu:  {}
		, vs:   []
		, v1:   []
		, v2:   []
		, v3:   []
	}; 
	vData.argv.test = true;
	
	SP.snumber  = function(){return w3[this]-1;}
	AP.snumber  = function(){return w1[this[0]];}

	vData.elements();
	vData.vp.elements();
	vData.area.elements();
	vData.vsu = vData;

	return {area:vData.area, data:vData, smal:vData.smal, large:vData.large, symbols:vData.symbols};
}
module.exports = sushi();
module.exports._ = module.exports.elements();

if(require.main)
	process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
