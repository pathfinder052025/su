/*jslint node: true, for: true */
'use strict';

         require('../dist/index.lists.cjs');
var se = require('../dist/index.data.cjs');
var su = require('../dist/index.import.cjs');
var st = require('../dist/index.type.cjs');

var {O1,O2,O3,O4,O5,O6,AP,FP,OP,NP,SP,JP,JS,methods} = su;
var {sizeof,unicsub} = methods;

var {ansi,beautify,colors,diff,em,Emitter,events,fs,funcloc,GkListener,julian,minimist,path,progress,thenify,types} = methods;
var {argv, border, seed1, seed2, seedt, types} = se;
var cursor = ansi(process.stdout);
var {floor} = methods.lodash; 
var {abs,random,round} = Math; 
var {CHR, ORD} = global;

AP.chrElement    = function()     {return (this.map((c) => isFinite(c)?CHR(c-1,1):`.`)).join(``)}
AP.counts        = function()     {var v=[],w=[];this.map((s) => `${s}`.counts(v));O1(v).map((n) => (v[n]==1)?w.push(+n):0);w=(!w.length)?0:(w.length == 1)? w[0]:w.toString();return(w)};
AP.each          = function(pa)   {return(this.map((v) => (typeof pa == 'function')? pa(v):   pa[v]))}; 
AP.eachn         = function(pa,n) {return(this.map((v) => (typeof pa == 'function')? pa(v,n): pa[v+(n||0)]))}; 
                                  /* (9).toVektor().each('ABCDEFGHI').each(console.log); */
AP.getRandomInt  = function()     {return floor(random() * this[0])};
AP.getValueSeed  = function()     {var n=0; return O1(this).map((m)=>eval(`v[${n++}]=`+(this[m]).replace(/\r\n/g,'').replace(/(\s)*/g,'').replace(/,$/,'')))};
AP.inArray       = function(w)    {var v=this, vw = O1(O2(w)); vw = v.filter((s) => vw.indexOf(s) >= 0); return((vw.length)?vw:[])};
AP.logPuzzle     = function(s)    {cursor.goto(...this[0]); console.log((s? `[${s}] `:``)+`${this[1]}`)};
AP.numbers       = function()     {return this.map((n) => `${n}`.number());}
AP.numbersSu     = function(m=0,v){v=this.map((n) => isFinite(n)? `${n}`.number(): `-`); return((m)?v.join(''):v)};
AP.toTimeString  = function()     {return`${(floor(this[0]*1000)/1000)}`.padEnd(5, "0")}
AP.wait          = function()     {var start=new Date().getTime(); while(new Date().getTime() < start+Number(this[0]));};
AP.sleep   = async function(pa)   {await Promise.resolve(this).then(setTimeout(pa||(()=>{}), this[0]))};
                                  /* [5000].sleep(()=>{console.log('EXEC')});*/
AP.maxLengh      = function(v)    {return(Math.max(...(this.map((s)=> s.length))))};

FP.funcloc = async function(rc)   {await Promise.resolve(this).then(rc=await funcloc(this),this.__source = `../${rc.source.split('/').slice(-2).join('/')}[[${this.name}(${rc.line})}]`);return(this)};

NP.convertLet    = function(n)    {return (this).toVektor(n).map((n) => CHR(+`${n+32}`))};
NP.convertChr    = function()     {return (this).toVektor().map((n) => `${n+1}`.convertChr().toUpperCase())}; 
NP.getRandomInt  = function()     {return floor(random() * this)};
NP.getSign       = function()     {var sign, sy, n=this; sy=cursor.symbols.symbols._.split(','); sign = ["\u2588","\u2606",...sy]; return(n?sign[n-1]:[sign.shift(),sign[[sign.length].getRandomInt()]][1])}; 
NP.toSpace       = function(s,c)  {c=c||' '; s=s||c; return(s.padEnd(this,c))};
NP.toVektor      = function(n=0)  {return O1(' '.repeat(this+n)).numbers().slice(n)};
AP.toVektor      = function(n=0)  {return(eval(`[${('0,'.repeat(this[0]))}]`).map((n)=>n++))};
NP.formatSize    = function(m)    {var bo, bs, bytes, dp, nr, nu, vu;
                                   bytes = this; bs = m ? 1000 : 1024, dp=1;
                                   if (abs(bytes) < bs) {return bytes + ' B'};
                                   vu = (m)? ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB']
                                           : ['kB','MB','GB','TB','PB','EB','ZB','YB']
                                   nu = -1, nr = 10**dp;
                                   do {bytes/=bs; nu++; bo=((round(abs(bytes)*nr)/nr >= bs) && (nu < vu.length-1));
                                   } while (bo);
                                   return (`${bytes.toFixed(dp)} ${vu[nu]}`)};
OP.cloneObj      = function()     {return (O5(this))};
OP.isEmpty       = function()     {return(!O1(this).length)};
OP.toCount       = function(n,m=1){[this[n] = this[n] || 0, this[n] += m]};
OP.toArray       = function(o)    {return((!this.length && typeof this == 'object')? Object.values(this).cloneObj():this)};

SP.get           = function(o,f)  {o.__defineGetter__(this, eval(`global.tmp=function ${this}(){return f}`)); return(global.tmp)};
SP.set           = function(o,f)  {o.__defineSetter__(this, f)};
SP.add           = function(o,f)  {(!this.length)? O1(f).map((s)=>(o[s]=f[s])):([(!o[this])?o[this]={}:0, Object.assign(o[this], f)])};
AP.copy          = function(o)    {O1(this).map((n) => ''.add(o, this[n]))};
                                  /* var v; [{a:1,b:2,c:3},{d:4,a:0}].copy(v={}); => { a: 0, b: 2, c: 3, d: 4 } */
AP.sizeof        = function()     {return(sizeof(this[0]).formatSize())};
AP.sumSudoku     = function(v)    {v=this.numbers(); return(`[${[(Math.sum(v)==405)].toString()}]`)}; 'sum'.get(Math,(v)=>v.reduce((s,a)=>s+a,0));
AP.types         = function()     {var v=this[0],t='naosb'.indexOf((typeof v)[0]); (t==3)?(v.isDigit()?t=0:3):((t==2) && v.length==1)?t=1:0; return(t)};
AP.suValues      = function(n)    {var v=this, vs=[].silver(), vp=[0].silver(); return(vs[vp[n][1]].map((m)=> v[m-1]).unique2()[1])};

SP.beautyFkt     = function(name) {return {func:this}.beautify(name)};
SP.parmFkt       = function(su)   {var fs=this, vf={name:fs.match(/([A-Z][0-9]{2})(\(\))|\{\W(.+)\W\./)[1], first:fs.match(/\{\W([0-9.-]{81})\W\./)[1], func:fs, proc:(eval('fs='+fs),fs)}; fs.parm=JP(JS(vf)); return(su.proc=fs)};
SP.chrElement    = function()     {return (this.match(/[1-9]/))? CHR(this-1,1):`-`;}
SP.convertChr    = function()     {return (this.match(/[0-9]/))? [...this].map((c) => c.chrElement()).join(``): this;}
SP.convertOrd    = function()     {return (this.match(/[a-z]/))? [...this].map((c) => c.ordElement()).join(``): this;}
SP.counts        = function(v,s,n=1){if(this.match(/[0-9]/)) [s=this, v[s] = v[s] || 0, v[s]+=(s.repeat(n).length)]; return v};
SP.cursor        = function()     {return ansi(process.stdout)}
SP.emptyPuzzle   = function()     {return (81).toSpace((!this)?'-':this)};
SP.escapeColor   = function(nb=0) {return cursor.ansi.escapeColor(this, nb)}; SP.ec = "".escapeColor;
SP.filePath      = function()     {var ra=this.match(/^((.+)\/)(([^\/]+)(\w{3}))$/); return {dir:ra[1], file:ra[3]}};
SP.getSuName     = function(n)    {(n>5199)?(p=n):(n>2599)?n+=600:n; return CHR(floor(n/100)+ORD(this))+(`${(n%100)+100}`.slice(1))}
SP.hexToString   = function()     {return (Buffer.from(this, 'hex')).toString('utf8')};
SP.isDigit       = function(n=1)  {return eval(`/^\\d{${n}}$/`).test(this)};
SP.inArray       = function(w)    {v=[this]; w=v.inArray(w); return((w.length)?w.length:0)};
OP.isObject      = function()     {return ((!!this) && (typeof this === "object") && (!Array.isArray(this)))};
SP.number        = function()     {return (isFinite(this)?Number(this):0)};
SP.padding       = function(v,m=0){v=v[0]+this+v[1]; v=(m)?eval('v='+v):v; return(v)};
SP.usplit        = function()     {return(O1(this).map((n)=>unicsub(this,+n,(+n)+1)).filter((v)=>v.length))};

NP.space         = function(s=' '){return(s.repeat(this))};
AP.arrayShift    = function(m)    {var v=this; (m)?v.unshift(v.pop()):v.push(v.shift()); return(v)};
SP.strShift      = function(m)    {var v=[...this]; v.arrayShift(m); return(v.join(''))};
AP.uniNums       = ['⓿❶❷❸❹❺❻❼❽❾','🄌➊➋➌➍➎➏➐➑➒','０１２３４５６７８９','⓪①②③④⑤⑥⑦⑧⑨'];
NP.uniNums       = function()     {var v=(4).toVektor().each(AP.uniNums).each((s)=>s.usplit());return((!this)?v:v[this-1])};
AP.uniSign       = function(s)    {return (O2(this.map((s) => [s, eval(`${s}:'${s}'.uniSign()`)])))};
SP.uniSign       = function(s)    {
    var pu, pv, sa, sign, vn, vu, unicsub = require('unicode-substring');
    sign = {   
        uniMoon:    ["🌑🌒🌓🌔🌕🌖🌗🌘🔵"],
        uniClock:   ["🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛"],
        uniCar:     ["🚂🚃🚄🚅🚆🚈🚉🚊🚝🚞🚋🚌🚎🚐🚒🚓🚕🚖🚗🚙🚚🚛🚜"],
        uniNums:    AP.uniNums
    };
    pu = (s) => (pv(sign[`uni${s}`])[0]).filter((s)=> s.length);
    pv = (s) => (s).map((s)=> (s.length).toVektor().map((n) => unicsub(s, +n, (+n)+1)));
    sa = [...this], sa = sa[0].toUpperCase()+(sa.slice(1).join('')); 
    vu = sign[`uni${sa}`]; 
    if(this!='nums') return(pu(sa)); 
    
    vu = O1(vu).map((n)=> eval(`(sign.uni${sa}[${n}]).usplit()`));
    vn = vu.length.toVektor();
    vn = (10).toVektor().map((n) => vn.map((m) => unicsub(AP.uniNums[m],n,n+1)));
    O1(vn).map((n) => vn[n].unshift(+n));
    vu[vu.length] = vn;
    return(vu);
    // vu = ['car','clock','moon','nums'].uniSign();
};

AP.silver = function silver() {
  function sv(){
    var na, pa, pb, pc, va, vb, vc, 
    pa = (v) => [v=[...v], v.splice(6,0,','), v.splice(3,0,','), v=(v.join('').split(','))][3];
    pb = ()  => va.vbb = JP(JS(va.vba));
    pc = (n,m=1) => O1('0'.repeat(n)).map((n)=>(+n)+m); 
    va = {n1:0, n2:0, vbb:[], vbc:[], vbd:[], vnm:[], v09:pc(9), v81:pc(81)};
  
    va.vle = pa(vb='ABCDEFGHI'); 
    va.vln = pa(vc=va.v09.join('')); va.v09.map((n)=> va.vnm.push(...(va.v09.map((m)=> [n,m]))));
    va.vlm = [O2((va.v09.map((n) => [[...vb][n-1],[...vc][n-1]]))), 0], va.vlm[1]=O1(va.vlm[0]), va.vlm[1].unshift(0);
    va.vrg = va.vle.map((s)=> [...s].map((s)=>s.repeat(3)).join('').repeat(3)).join('');
    va.vne = va.vln.map((s)=> s.repeat(3)).join('').repeat(3);
    va.vba = va.v81.map((n)=> [n, va.vrg[n-1]+va.vne[n-1], va.vnm[n-1][0], va.vnm[n-1][1], +va.vlm[0][va.vrg[n-1]]]);
    va.vba = va.vba.map((v)=> [v.splice(5,0,va.vlm[1][v[4]]),[...v, `Z${v[2]}`, `S${v[3]}`, `R${v[4]}`]][1]); pb();
    va.vbb.map((v)=> va.vbc.push(v[1], ...v.splice(-4))); 
    va.vbc = [...new Set(va.vbc)].sort((a,b)=>((a.length==1)&&(b.length==1)?((a<b)?-1:1):((a<b)?-1:1)));
    va.vbc.map((v)=> va.vbd[v]=[]); pb();
    va.vbb.map((v)=> v.splice(-4).map((s)=> va.vbd[s].push(v[0]))); pb();
    va.vbb.map((v)=> [[6,7,8].map((n)=>va.vbd[v[1]].push(...va.vbd[v[n]])), va.vbd[v[1]] = [... new Set(va.vbd[v[1]])].sort((a,b)=>(a<b)?-1:1),((na=va.vbd[v[1]].indexOf(v[0])) >=0)?va.vbd[v[1]].splice(na,1):0]);
    va.vbd[0] = va.vba; va.vbd[1] = O2([...vb].map((s)=> [s, [va.vbd[s]=va.vbd[s].map((n)=> va.vbb[n-1][1])][0]]));
    vc = {wl:[...vb], w1:O2(va.vbd[0].map((v)=> [v[1], v[0]]))};
    va.vbd.push(va.v09.map((n)=> va.vbd[`Z${n}`]),va.v09.map((n)=> va.vbd[`S${n}`]));
    va.vbd.push(O2(vc.wl.map((s)=> [s, va.vbd[s].map((t)=> vc.w1[t])])),vc.w1);
    va.vbd.push(O2(O3(vc.w1).map((v)=> v.arrayShift())));
    va.vbd.a  = vc.wl;
    return(va.vbd);
  };
  console.silver = console.silver || sv();
  if(console.silver[this[0]]) return(console.silver[this[0]]);
  return(console.silver);
};

AP.framesSeed = function framesSeed(select=1) {
  var pc, pr, first, last, frames, framepos, patter, seed;
  var va, vb, vc, vd;

  seed = this[0], first=this[1]||0, last=this[2]||0, seed.pfirst=this[3]||{x:1,y:1}, seed.pos = {x:2,y:2};
  if(this[4] != 0) seed.view=this[4];
  (!this.length)?0:(!seed.first)?0:
  patter = {first:[...seed.first,''], name:seed.name, so:seed.first.match(/\d{1}/g).length, delay:seed.delay||250, view:seed.view||true};

  framepos = (va) => {
    va.v09.map((n)=> va.v09.map((m)=> va.vp[(n-1)*9+(m-1)]=[va.v0.x+va.col[m-1]-1,va.v0.y+va.row[n-1]-1]));
    O6(va.vp, {home:va.vp[0], middle:va.vp[(80>>1)], end:va.vp[80]});
    return(va.vp);
  };
  frames = (nn) => {
    va = {ba:  ['╟┼─╢', '║│ ║', '║│ ║', '║│ ║'], 
          bb:  ['┠╋━┨', '┃┃ ┃', '┃┃ ┃', '┃┃ ┃'], 
          bc:  ['╔══╗', '║  ║', '╠╤═╣'], 
          bd:  ['┏┳━┓', '┃  ┃', '┠┳━┨'], 
          be:  ['╚╧═╝', '┗┻━┛'], 
          pb:  (v,w,n=0,s='--')=> v.join(';').split(s).map((s)=> s+w[n++]).join('').split(';'),
          pc:  (v,n)=> [v=v.map((s)=> s.padding(va.sz[n]).padding(va.sz[n])), v.unshift(va.sz[n]), v.push(va.sz[n]),v][3],
          pd:  (v,n,w)=> [`box${n}`, [w=JP(JS(v)), w[1]= w[1].replace(va.vz[0], va.vz[n])][0]],
          sv:  [0].silver(),
          vm:  [0,1],
          v09: (9).toVektor(1),
          v10: (10).toVektor(),
          v81: (81).toVektor(),
          vn:  (15).toVektor(),
          sz:  {a:'░', b:'█'},
          vz:  [...'⓿❶❷❸❹❺❻❼❽❾'],
          vp:  {},
          v0:  seed.pfirst,
          pos: [3,4,5, 7,8,9,   11,12,13],
          row: [5,6,7, 9,10,11, 13,14,15],
          col: vc=[[5,7,9,13,15,17,21,23,25],[5,8,11,15,18,21,25,28,31],[5,8,11,16,19,22,27,30,33]][nn],
          txt: {s:'Sudoku Tabelle XXX', k:vc[8], n:18, m:(vc[8]>>1)-8},
          size:[7,9,10][nn]
    };
    framepos(va);

    va.boxa = [...va.bd, ...va.bb, ...va.bb, ...va.bb, va.be[1]]; va.boxa.splice(3,1); 
    va.box0 = [...va.bc, ...va.ba, ...va.ba, ...va.ba, va.be[0]]; va.box0.splice(3,1);
    va.sz   = {a:va.sz.a.repeat(va.txt.k+4), b:va.sz.b.repeat(va.txt.k+4), c:va.sz.a+va.sz.a, d:va.sz.b+va.sz.b, n:va.txt.k+4};
    va.sw   = va.sv.map((v)=>v[1]), va.sw.push('');

    vd = (['box0','boxa'].map((s)=> [s, va.vn.map((n)=> [vb = [...va[s][n]], vc = vb[0]+[...vb[2].repeat(va.size), vb[1], ...vb[2].repeat(va.size), vb[1], ...vb[2].repeat(va.size)].join('')+vb[3]][1])]));
    O1(vd).map((k)=> va.col.map((n)=> va.pos.map((m,na)=> vd[k][1][m] = vd[k][1][m].splice(n-3, na=(nn<2)?1:nn, '-'.repeat(na))))); 

    va.b1     = vd[0][1];
    va.b1[0]  = va.b1[ 0].splice(2,2,`${va.vz[0]} `).splice(va.txt.k-6,4,'[ZZ]');
    va.b1[1]  = va.b1[ 1].splice(va.txt.m,18,va.txt.s);
    va.b1[14] = va.b1[14].splice(va.txt.k-5,3,'[Y]');
    va.frm    = va.pc(JP(JS(va.b1)),'b');
    vd        = O2([['box0', va.pc(va.b1,'a')], ...va.v09.map((n)=> va.pd(va.frm,n)), ['boxa', vd[1][1]]]);
    vd.names  = O1(vd);
    
    if(nn > 1) {
      va.b2  = vd.boxa, va.b2.splice(1,2); 
      va.b2  = vd.boxa = va.pb(va.b2,va.sw,0);
    };
    O6(vd, {col:va.col, row:va.row, size:va.size, vp:va.vp, sz:{a:va.sz.a[0],b:va.sz.b[0]}, vz:va.vz});
    'pb'.get(vd, va.pb); vd.va = va; 
    return(vd);
  };
  pr = (select) => {
    var fr = {box:[0,1,2].map((n)=> frames(n))};
    'pb'.get(fr, fr.box[0].pb);
    fr.box[select].boxa = fr.box[1].boxa = fr.box[2].boxa;
    console.silver.frames = fr = fr.box[select];   
    O1(va.sv).map((n)=> va.sv[n].push(...fr.vp[n])); 
    fr.vs = [0].silver(), [].silver()[7] = fr.vp;
    return(fr);
  };
  pc = (select) => {
    var fr, fs, na, sa, vn, v10;
    'frames'.timerOn();
    console.frames = console.frames || pr(select);
    fr = JP(JS(console.frames)), vn=[];
    fr.pw = (x,y,s,v)=> {
      v=(seed.frameMap = seed.frameMap || []);
      if(x == -2) [v.names=y, v[v.names] = [], vn.push(v.names)]; else
      if(x == -4) [v.names = vn]; else
      v[v.names].push([x,y,s||'']);
      if(patter.view == true) 
        // console.log(x,y,s||'');
        (x < -1)? 0: (x == -1)? [y].wait() :cursor.goto(x, y).write(s);
    };
    if(patter) {
      v10 = (10).toVektor();
      v10.map((n)=> [
        sa = fr.names[n],
        fr[sa]     = console.frames.pb(fr[sa], patter.first, 0, '-'), 
                     [fs=fr[sa].join(';'), na=fs.match(eval(`/${n}{1}/g`)), na=(!na)?0:na.length],
        fr[sa]     = fs.replaceAll(n, fr.vz[n]).split(';'),
        fr[sa][1]  = fr[sa][ 1].replace('ZZ', (`${patter.so}`).padStart(2,'0')),
        fr[sa][15] = fr[sa][15].replace('[Y]', (!n)? `${'═══'}`: `[${na}]`),
      //fr[sa][2]  = fr[sa][ 2].replace('XXX  ', `${patter.name}:${n}`)
        fr[sa][2]  = fr[sa][ 2].replace('XXX', `${patter.name}`)
      ]);
      function log(fn, m1) {
        var n2, m2, m3, s2, sz, {x, y} = seed.pos; // patter.delay=0;
        m2 = m1+45; 
        if(first) n2=last.search(/\s(\d{1,81})/)+1;
        fr.names.reverse(), fn=fn.arrayShift().reverse();
        O1(fn).map((n)=> {n=+n;
          fr.pw(-2, fr.names[n]);
          if(first) {
            (n)? fr.pw(1,20,first):0, (!n)?0:(n < 2)?fr.pw(1,21,last):
            [sz=fr.vz[n-1], s2=last.slice(n2,n2+81).replaceAll(eval(`/${n-1}/g`), sz), s2=last.splice(n2,81,s2), fr.pw(1,21,s2)];
          };
          m3 = (fr.names[n]=='boxa')?3:2;
          [y=m3, x=(!n)?m1:m2, (fr[fr.names[n]].map((s)=> fr.pw(x, y++,s))), fr.pw(-3,23,''), fr.pw(-1,(!n)?0:patter.delay)];
        });
        fr.pw(-4, 0);
      };
      log(fr.names, 40);
    };
    fr.seed = seed;
    fr.time = 'frames'.timerOff()
    this[0].frames = fr;

    if(!va && console.silver.frames) {
      va = console.silver.frames;
      va.va.v0 = seed.pfirst;
      fr.vp = framepos(va.va);
    };  
    return(fr);
  };
  return(pc(select));
};
// var framesSeed = [seed={first:su.parts.fo.vsm1, name:'A01'}].frames(1);

AP.solveSeed = function solveSeed() {
  var pa, pb, pc, pd, pe, pi, ps, p1, p2, p3, p4, p5, p6, p7, p8, p9, seed, so, vb, vc;

  p1 = (v)    => {return([...(v.join(''))].sort().join(''))};
  p2 = (s)    => {return([vc.v09.map((k)=> s=s.replace(eval(`/${k}{2,9}/g`),'')),s][1])};
  p3 = (v,s,t)=> {return([t=((!s.length)?'':v.map((k)=>(`${vc.vk[k-1]}`.isDigit()?'':`${vc.vs[k-1][1]}:${vc.vn[k-1]},`)).join('').slice(0,-1)), eval(`t={${t}}`), p4(t,s)][2])};
  p4 = (v,s,t)=> {return([[v=O3(v), t=[...s]], v=v.map((v)=>(`${v[1]}`.indexOf(t[0])<0)?0:`${v[0]}:${t[0]}`).fc().join()][1])};
  p5 = (v,s,t)=> {return([[vc.vs[v[0]-1][1], s=p1(v.map((n)=> vc.vn[n-1])), t=p2(s), s=p3(v,t)], (!s.length)?0:s][1])};
  p6 = (v,w)  => {return([w=[vc.vp[5][v[0]]-1, v[1], v[0]], vc.vk[w[0]]=w[1]][0])};
  p7 = (v)    => {return(([v].types()==2)?v:v.join(''))};
  p8 = (v)    => {return(vc.vb.push(...(vc[v].each(p5))))};
  p9 = (v,n)  => {return([n=v[0]-1, (`${vc.vk[n]}`.isDigit())?vc.vk[n]: eval(`[...'${vc.vn[n]}']`)][1])};

  pa = (v,w,n)=> {return(([v].types()!=1)?0:(v.length>1)?((!n)?'-':v):[vb[0]++, vb.push([w[0]-1,v[0],w[1]]),+v[0]][2])};
  pb = (v,n)=>   {return((!n)?(+v): (`${v}`.repeat(2)))};
  pc = (v,w,n)=> {vb=[0]; 
    return(w.map((p)=>(`${v[p[0]-1]}`.isDigit())?pb(v[p[0]-1],n):pa(vc.vp[p[1]]
        .map((n)=>(`${v[n-1]}`.isDigit())?(+v[n-1]):0).unique2()[1],p,n)
  ))};
  pd = (v,w,n)=> {
    [vc.vn = pc(v,w,n).each(p7), vc.vb=[], 
     ['w2', 'w3','w4'].each(p8), eval(`vc.vb={${vc.vb.fc().sort()}}`),
     vc.vb = O3(vc.vb).each(p6), vc.vb.unshift(vc.vb.length)];
    if(!vc.vb[0])
        vc.vm = vc.vs.map(p9);
    return(vc.vb);
  };
  pe = (v)=> {
    vc.v2.se = vc.vd[vc.vd.length-1], vc.v2.v1 = vc.v2.se.match(/\d{1}/g), vc.v2.v2 = vc.v2.se.match(/\D{1}/g);
    vc.v1.push([vc.v2.v1=vc.v2.v1.length, vc.v2.v2=(!vb[0])?vc.v1[0][0]:(!vc.v2.v2)?0 :vc.v2.v2.length, vc.v2.v3=(!vb[0])?vc.v1[0][1]:vb[0], vc.v2.v4=vc.v3++, vc.v2.v5=(!vb[0])?vc.v4:JS(vb)]);
    vc.vd[vc.vd.length-1] = `${vc.v2.se} [${vc.v2.v1}:${vc.v2.v2}:${vc.v2.v3}:${vc.v2.v4}] ${vc.v2.v5}`;
    (!v[0])?0: vc.vd.push(vc.vk.join('')); 
    if(so) 
    if(seed.view) {
      var x=1, y=20, log = (s) => [cursor.goto(x,y++).write(s)];
      if(!cursor.isSrcClear) {cursor.clearScreen(), cursor.isSrcClear=true};
      cursor.goto(1,20);
      [[vc.sa=vc.vd[0].split(' '),           vc.sa=`${vc.sa[0]} [${seed.name}]`][1],
       [vc.sb=vc.vd.slice(-1)[0].split(' '), vc.sb=`${vc.sb[0]} ${vc.sb[1]}`][1]].each(log);
       vc.vd.frames = [seed].framesSeed(1);
    }
  };
  pi = (v)=> {
    seed = v;
    vc = {vd: [seed.first],
          vk: [...seed.first],
          vp: [].silver(),
          vs: [0].silver(),
    };
    O6(vc, {v1:[], v2:{}, v3:0, v09:(9).toVektor(1), vl:vc.vp.a});
    O6(vc, {w1:vc.vp[5], w2:vc.vp[2].toArray(), w3:vc.vp[3].toArray(), w4:vc.vp[4].toArray()}); 
  };
  ps = (v)=> {return(`[${[so=(Math.sum(v)==405)].toString()}]`)};
  pi(this[0]);

  do {
    vc.vk = pc(vc.vk,vc.vs,0); 
    (vb[0])?0 :[vc.v4=ps(vc.vk),(so)?0:vb=pd(vc.vk,vc.vs,1)];
    pe(vb)
  } while(vb[0] != 0); 
  return(vc.vd);
};

NP.emNew         = function(f)    {global.glbEmitter = global.glbEmitter || [];
                                   return (glbEmitter[this-1] = new su.methods.Emitter())};
                                   /* glbEmitter.eventMap; glbEmitter._events; */
SP.on1           = function(f)    {return (glbEmitter[0].on(this, f))};
SP.emit1         = function(...p) {return (glbEmitter[0].emit(this, ...p))}; 
SP.emitTime1     = function(...p) {return (glbEmitter[0].emitTime(this, ...p))}; 
SP.emitTimeStop1 = function()     {return (glbEmitter[0].emitTimeStop(this))};
AP.emSort1       = function()     {return (glbEmitter[0].sort(this))};
SP.emLength1     = function(...p) {return (glbEmitter[0].emitLengths(this, ...p))};
SP.emCount1      = function()     {return(!this.length)?''.emLength1():O1(''.emLength1()).filter((i) => i.startsWith(this))};
SP.emNew2        = function(f)    {return (glbEmitter[1] = new su.methods.Emitter())};
SP.on2           = function(f)    {return (glbEmitter[1].on(this, f))};
SP.emit2         = function(...p) {return (glbEmitter[1].emit(this, ...p))}; 
SP.emitTime2     = function(...p) {return (glbEmitter[1].emitTime(this, ...p))}; 
SP.emitTimeStop2 = function()     {return (glbEmitter[1].emitTimeStop(this))};
AP.emSort2       = function()     {return (glbEmitter[1].sort(this))};
SP.emLength2     = function(...p) {return (glbEmitter[1].emitLengths(this, ...p))};
SP.emCount2      = function()     {return(!this.length)?''.emLength2():O1(''.emLength2()).filter((i) => i.startsWith(this))};
SP.emCounts      = function()     {return([JS(this.emCount1()), JS(this.emCount2())])};

SP.on            = SP.on1;
SP.emit          = SP.emit1; 
SP.emitTime      = SP.emitTime1;
SP.emitTimeStop  = SP.emitTimeStop1;
AP.emSort        = SP.emSort1;
SP.emLength      = SP.emLength1;
SP.emCount       = SP.emCount1;

SP.ordElement    = function()     {return (this.match(/[a-z]/))? ORD(this,1)+1:this;}
SP.pathNormalize = function()     {return (this.startsWith(`..`) ?(path.normalize(__dirname+`\\`+this)) :this)}
SP.renDataName   = function(s)    {return this.filePath().dir+this.filePath().file.replace(/\.([\w]{3})data\./, `.${s}.data.`)};
SP.splice        = function(...p) {var va=[...this]; va.splice(...p); return(va.join(''))};
SP.stringToHex   = function()     {return Buffer.from(this, 'utf8').toString('hex')};
SP.timerOff      = function()     {return (`${this}`.timerMessure(0))};
SP.timerOn       = function(n=1)  {return (`${this}`.timerMessure(n))}; 
SP.toArray       = function(b)    {var v=[...this]; return (b)?v.numbersSu():v};
SP.toCounts      = function(e)    {var p=this.toPears(); return {so:`[${p[0]}:${e}]`, sn:[p[0],p[1],0], last:this}};
SP.toKeyNumbers  = function()     {return (O1(this).numbers())};
SP.toPears       = function()     {return (this.slice(0, 81)).countSigns()};
SP.uniqueStrings = function()     {var vv = [...new Set(this.split(`,`).sort())]; while(!vv[0].length) vv.shift(); return vv.join(',')};
SP.voutReplace   = function(r,s)  {return this.replace(eval(`/{${r}}/`), s)};

SP.stdwrite      = function(x,y)     {var cursor = "".cursor(); cursor.goto(x,y).write(this); return cursor};
SP.clearWrite    = function(x,y,n,c) {var sc; (!n)?n=this.length:0; sc = " ".repeat(n); c? sc=c.replace(/X/,sc):0; sc.stdwrite(x, y); this.stdwrite(x, y)};

NP.randCounter = function randCounter() {
  var nr, nn=this, vr = this.toVektor(), vv=[];
  do{nr=[nn].getRandomInt(); vv.push(vr.splice(nr, 1)[0])} while(nn=vr.length); 
  return(vv);  
};

/* "mouseup", "mousedown", "mousemove", "mousewheel" */
SP.mouseEvents = function(p) {su.mouseEv.on(this, p)};

AP.setKeypressFunction = function setKeypressFunction(mode=1) {
  var fn, sn, va = this, vp = va.shift();
  va.length.toVektor().map((n) => [sn=`"${va[n]}"`,[va[n], eval(`fn=function _${va[n]}(){${vp}=${(mode)?sn:(n+1)}}`)]][1]).emTimeSetKey();
};
AP.joinNumber = function(vk,semc={cn:[],sn:[]}) { /* this=[1,`-`,3,...9], vk=[`-`,2,3,...9] */
    var va = this.map((s) => !isFinite(s)?`${s}`.escapeColor(1):s);
    var vm = O1(vk).numbers();
    if(vk) { vm.map((n) => (!isFinite(vk[n]))? va[n] = `${va[n]}`.escapeColor(2) :0);
             semc.cn = vk.join('').countNumber();
             semc.sn = JS(semc.cn);
    }
    return va.join('');
}
SP.countNumber = function(mode=0,s='Z') {
    var vl = O1([...this]).numbers().slice(1,10);
    var pa, va, vb, vr = vl.map((n) => eval('/'+n+'/g'));
    pa = (n) => {vb=this.match(vr[n-1]); return (!vb)?0:9-vb.length};
    va = vl.map((n) => [(s=='Z')?(s+n):(+n), (!mode)?pa(n):9-pa(n)]);
    return O2(va);
}
AP.uniqueA = function() {
  var w, v9, v9='123456789'; 
  w = [... this].sort();
  while(!w[0] || !isFinite(w[0])) w.shift(); 
  w = w.join('');
  [...v9].map((n) => w = w.replace(eval(`/${n}{2,9}/g`),'')), 
  w = [...w].map((n)=>+n); 
  return(w);
}
AP.uniqueArray = function() {
  var na, pa, pb, pc, pd, pe, pf, pu, sa, va, vb, vc, v09, wa, wb, wc;
  na = 0, va=this.flat().sort(), v09=(9).toVektor(1), wa=['a'].silver(), wb=[5].silver(), wc={};
  pa = (v,w)=> [w='', v.map((s)=> w+=s.slice(3)), w.unique()][2];
  pb = (n,v)=> [v=va.slice(na,na+=9), v.splice(0,0, wa[n], sa=pa(v), sa.length), v][2];
  pc = (v,c,s,w,u)=> [c=v[0], s=[...v[1]], w=v.slice(3), u=[], 
          w=w.map((q)=> s.map((p)=> (q.slice(3).indexOf(p) < 0)?0:`${q.slice(0,2)}:${p}`)).flat().filter((v)=>v),
          wc[v[0]]=wc[v[0]]||[], wc[v[0]].push(w.toString()), wc[v[0]]=wc[v[0]].toString()];
  pd = (v)=> v.splice(1, 0, wc[v[0]]);
  pe = (v)=> eval('v='+wc.toArray().toString().padding('{}'));
  pf = (v)=> [wb[v[0]]-1, v[1], v[0]];
  pu = (v)=> {
    var vs = this.split('').sort().join('');
    v09.map((n) => vs=vs.replace(eval(`/${n}{2,9}/g`),''));
    return(vs);
  };
  vb = v09.each(pb).filter((v)=> v[2]), vb.each(pc), vb.each(pd);
  vc = O3(pe()).each(pf);
  return(vc);
}
AP.puArray = function(se) {
  return(O1(this).map((n)=> `${this[n]}`.puArray(se,+n)));
}
SP.puArray = function(se,n) {
  var t,v,w,s1,s2,s3,s4,w2,nl;
  nl = (se && se.last)?+se.last[n]:0;
  v = this, t = [w = ((`${v}`.isDigit())?+v:se.vk.suValues(n))].types(), w2=[6].silver(); 
  [s1=(!t)?w:(t==2)?w[0]:w=w.join(''),s2=w2[n+1],s3=nl,s4=(t==1)?`${s2}:${s1}`:`${s2}:${s1}${s1}`];
  return([n,s1,s2,s3,s4,t]);
}
SP.numCount = function() {
  var v, w; v=this; return([v.match(/\d{1}/g).length,[(w=v.match(/\D{1}/g)),(w)?w.length:0][1]]);
}
SP.suCount = function(vb,vf) {
  var vb, vo = this.numCount(); 
  vo.splice(2,0,vb.length-1,vf.length,vf.map((v)=> `"${v[2]}":${v[1]}`).join().padding('{}'));
  vf._ = JS([vo.slice(0,4), JP(vo[4])]);
  return(vo);
}
AP.unique2 = function(mo=0) {
  return this.unique(this.unique(mo), mo);
}
AP.unique  = function(mo=0) {
    const vl = [1,2,3,4,5,6,7,8,9];
    var va = [...(new Set(this.sort()))].numbers().sort();
    while(va.length && !va[0]){va=va.slice(1)};
    if(mo) va = [va, diff.diff(vl, va).removed];
    return va;
}
AP.procTime = function() {
    var now, td, tt;
    now = this[0]||new Date();
    td  = now.toDateString(), tt = now.toTimeString();
    return `${td.slice(0, 15)} ${tt.slice(0, 9)}`;
}
AP.julianDate = function(mode=0) {
    var tp = 'osn'.indexOf((typeof this[0])[0]); (mode)?tp++:0;
    var td = (tp < 2)? julian((!tp)?this[0]:new Date()): julian.toDate(this[0]);
    (tp==3)? td = `'${[td].procTime()}'`.trim():0;
    return(eval(td));
}
/*
var dt = new Date(2025, 4, 24, 0, 0, 0);
var nd = ['now'].julianDate();
var jd = [dt].julianDate();
var td = [nd].julianDate(1);
var td = [jd].julianDate();
*/
AP.procBar = function(x, y, count) {
    var cursor = this[0]||ansi(process.stdout);
    /* create new progress bar */
    var sbar = new progress.SingleBar({
        format: 'Solve Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks [{name}]',
        barCompleteChar:   '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    sbar.pos  = {x, y};
	  sbar.goto = ()  => {cursor.goto(sbar.pos.x, sbar.pos.y)};
    sbar.str  = (p) => {sbar.goto(); sbar.start(...p)};
    sbar.inc  = (s) => {sbar.goto(); sbar.increment(s)};
    sbar.upd  = (s) => {sbar.goto(); sbar.update(s)};
    sbar.end  = ()  => {sbar.goto(); sbar.stop()};
	sbar.str([count,  0, {speed: 'N/A', name:'start'}]);
	return sbar;
}
SP.readSign = function() {
  /* file = __filename.readSign(); */
  var buffer, data, file, fp, fstat, nn, nv, va, vb, vc, vd, ve, vdata, wb, wd, newTime;
  if(!(file=this).length) file = __filename;
  if (!fs.existsSync(file)) return(0);
  newTime = new Date();
  fp      = fs.openSync(file, 'r+');
  fstat   = fs.fstatSync(fp);
  buffer  = Buffer.alloc(fstat.size);
  fs.readSync(fp, buffer);
  fs.futimesSync(fp, newTime, newTime); /*access and modify Times*/
  fs.closeSync(fp);

  data = buffer.toString();
  vdata = data.replace(/\r/g, ``).split(/\n/);
  vdata = vdata.filter((s) => s.length);
  wb = ['BOF'], vb = {}, nn = 0, nv = 0;
  wd = vdata.filter((s) => (s.startsWith(`$`)));
  if(!wd.length) throw(new Error("No config data!"));
  wd = wd.slice(1, -1).map((v) => v.slice(1).trim());
  vdata.map((s) => {
    (s.startsWith(`$`))
    ? [wb[++nv] = s.slice(1), nn = 0]
    : [vb[wb[nv]] = vb[wb[nv]] || [], vb[wb[nv]].push(s), nn++]
  });
  vb.code = ([...vb.BOF, ...vb.EOF].join('\r\n'));
  try {
    vb.code = beautify(vb.code.replace(/\t/g, ' ').replace(/[\r\n]/g, ''));
  } catch (error) {
    console.log(error);
    throw error;
  };
  vb.sign = O2(O1(vb).map((s)=> (s.startsWith('SIGN'))?[s, vb[s]]:0).filter((v)=>v));
  O1(vb.sign).map((n)=> vb[n] = O2(vb.sign[n].map((s)=> s.trim().split(' ')).map((v)=> [v[1],v[0]])));

  vb.config=vb.config||{}; 

  SP.configPuzzle = function(pa){  
    global.tmp = global.tmp || {nc:0,nn:1,vp:0};
    if(!tmp.nc) tmp = {nc:0,nn:1,vp:0};
    if(this == 'delete') {delete global.tmp; return};
    tmp.sp = this.slice(0,81);
    tmp.no = (tmp.sp.match(/[a-k]/g))? tmp.sp.match(/[a-k]/g).length:0;
    if(tmp.no) {
      tmp.sp = tmp.sp.convertOrd();
      tmp.po = {orig:pa};
      tmp.po.solution = pa.solution.convertOrd();
    } else {
      tmp.sp = ([...tmp.sp].map((s) => isFinite(s)?(s):'-')).join('');
    }     
    tmp.nl = tmp.sp.match(/[\.\-]/g).length;
    tmp.nc = (tmp.nl < 81)? tmp.sp.match(/[1-9]/g).length:tmp.nn=0;
    tmp.pa = ({name:'A'.getSuName(tmp.nn++), puzzle:tmp.sp, open:81-tmp.nc, so:`${tmp.nc}:${81-tmp.nc}`});
    if(tmp.po) Object.assign(tmp.pa, tmp.po);
    return(tmp.pa);
  };  
  if(vb.FTEXT)  {O6(vb.config, {ftext:vb.FTEXT})};
  if(vb.SEED)   {global.tmp = {nc:0,nn:1,vp:0}; 
                  {O6(vb.config, {seed: vb.SEED = vb.SEED.map((s) =>
                  {  tmp.sp=s.trim().replace(/[\'\"]/g,'').slice(0,81);
                    (tmp.sp.match(/[a-z]/))? tmp.sp=tmp.sp.convertOrd():0;
                    (tmp.sp.match(/[\.]/ ))? tmp.sp=tmp.sp.replace(/\./g,'-'):0;
                    return(tmp.sp.configPuzzle())
                  })})};
                  'delete'.configPuzzle();
  };
  if(vb.CODE) {
    vb.section = {sections:[], names:[], name:'', new:true, nn:0, pa:true}; 
    vb.CODE.map((s) => s.trim()).map((line)=> {
      vb.section.new = (line[0] == '[')
      ? [0,vc=[],va=vb.section[vb.section.name=line.slice(1,-1)] = {}, vb.section.sections.push(vb.section.name)][0]
      : [++vb.section.nn,vc=(!vc.length)?(vb.section[vb.section.name].code=[]):vc, vc.push(line.trim())][0];
      (!vb.section.new)? vb.section.names.push(vb.section.name):0;  
    });
    vb.CODE = O2(O1(vb.section.names).map((n) => 
      [ vd = vb.section.names[n]
      , vc = beautify(vb.section[vd].code.join(''))
      , ve = eval(vc)
      , ve.__code = vc
      , ve.__size = sizeof(vc)
      , [vd, ve]
      ].slice(-1)[0]));
  } else 
    vb.CODE = {}; this;
    if(vb.code) {
      vd = vb.code.match(/class\s+(\w+)\s+/);
      if(vd) {
        try {
          vb.CODE[`main_${vd[1]}`] = vb.code = beautify(vb.code).split('\n');
        } catch (error) {
          console.log(error);
          throw error;
        }}        
    };
    if(vb.CONFIG) {
      vb.section = {sections:[], name:'', new:true}; 
      vb.CONFIG.map((s) => s.trim()).map((line)=> {
        vb.section.new = (line[0] == '[')
          ? [0,va=vb.section[vb.section.name=line.slice(1,-1)] = {}, vb.section.sections.push(vb.section.name)][0]
          : [vc=line.split('='), vc=[vc.shift().trim(), vc.join('=')]][1];
        (vb.section.new)? vb.section[vb.section.name][vc[0]] = eval('vd='+(vc[1].trim())): 0;
    });
    vb.CONFIG = O2(vb.section.sections.map((s) =>[s, vb.section[s]]));
  };
  wd.map((n) => vb.config[n.toLowerCase()] = vb[n]);
  wd.data = O2(wd.map((s) => [s, vb[s]]));
  wd.data.elements();
  return wd.data;
};
SP.readSigns = function() {
    var fsig = this;
    var log, nn=0, ps, vn, sa, so, va, vs={};
    ps = (s,n) => {return (s.slice(n).trimEnd())};   
    log = console.log;
    fsig = fsig.pathNormalize();
    sa = fs.readFileSync(fsig, {encoding:'utf8', flag:'r'});
    va = sa.split(/\r\n/g);
    vn = new Array(va.length).fill(0).map(() => nn++), nn=0;
    vn.map((n) => (va[n][0]==`$`?so=ps(va[n],1): vs[so] = (!vs[so])?ps(va[n],2): vs[so].concat(',\n',ps(va[n],2))));
    return vs;
}
SP.countSigns = function() {
    var sa=this, re, ra;
    re = [/(?:[1-9])/g, /(?:[\-\_\.])/g];
    ra = [new RegExp(re[0]), new RegExp(re[1])];
    return [ra[0].test(sa)? sa.match(ra[0]).length :0, ra[1].test(sa)? sa.match(ra[1]).length :0];
}
AP.startTimer = function() {
    var cursor = this[0], changeProc = this[0];
    cursor.Timer.prototype.init();
    [['space', cursor.timer.exit]].forEach((v) => cursor.timer.onKeys(v));
    cursor.Timer.prototype.setHI(changeProc);
    cursor.Timer.prototype.runs();
}
AP.timerMessure = function() {
    var time, pr = process;
    if (this[0] === 1) return pr.hrMessures = pr.hrtime();
    time = pr.hrtime(pr.hrMessures);
    time = Number((+`${time[0]}.${time[1]}`).toFixed(3));
    return time;
}
SP.timerMessure = function(mode=0) {
	var name = this;
	var time, pr = process;
	pr.hrMessure = pr.hrMessure||{};
	if (mode == 1) return pr.hrMessure[name] = pr.hrtime();
	time = pr.hrtime(pr.hrMessure[name]);
	time = Number((+`${time[0]}.${time[1]}`).toFixed(3));
	return time;
}
AP.exitProc = function() {
	var time = this || [1000]; 
	time.wait();
	process.stderr.write(cursor.ansi.show);
	process.exit(1);
};
AP.prevFunction = function prevFunction(option) {
  var keys, self, step = this, pa, pf;
  step.push(option, option.steps);
  pa = (s) => { 
    try {
      self.em.on  (`-p:${s}`, self[`_${s}`]);
      self.em.emit(`_p:${s}`, self, self.option);
    } catch (error) {throw error};
  };
  pf = (pv) => { 
    var em, pf, pp, ps;
    self              = pv.pop();
    self.option       = pv.pop();
    self.option.steps = step;
    process.em        = process.em || new Emitter();
    ps = [ [], (s)=>pa(s)
       , {em:self.em=process.em, cursor:self.cursor=''.cursor()}
       , (pv)=> {ps[0]=pv, [1].each(ps[4])}
       , (n)=>  {ps[0].each(ps[n])}
       , pp=self.getPrototype()
       , eval([pf=(s)=> `pp['_${s}'] = function _${s}(self, option){self.${s}(option)};`,pv.each(pf)][1].join('\n'))
    ];
    ps[3](pv); pf=(s)=> [`s:${s}`, ps[5][s]], ps[9]=pv.each(pf); 
    keys = self.em.keys(), self.option._keys = `(${keys.length}) ${keys.join()}`;
    ps = {steps:ps[0], self, em:ps[2].em, cursor:ps[2].cursor, proc:O2(ps[9]), option:self.option};
    O6(self, ps);
    ps.option.elements();
    self.elements();
    return(ps); 
  };
  return(pf(step));
};

OP.beautify = function(name) {
  var log, types, pu, pv, pw, px, vp, vt=[], wt, wx, vTypes, wTypes;
  log = (s) => vt.push(s);
  if(!name) {
    log("var ansi   = require('ansi');");
    log("var cursor = ansi(process.stdout);");
    log("var AP = Array.prototype, SP = String.prototype, OP = Object.prototype;");
    log("//");
    console.log(beautify(vt.join(`\n`), { indent_size: 2, space_in_empty_paren: true }));
    vt = [];
    return;
  } 
  if(!this.element) wt = this.items={}; else return this.items;
  px = (e) => {
    pu = (sa, p) => {
      return ([sa, p(eval(`e.${sa}`))])};
    pv = (sa, type) => {
      vp = {function: (s)=>{return s.toString().replace(/(\s*)(\n|\r\n)(\s*)/g, `\n`)},
            string:   (s)=>{return s.stringToHex()},
            number:   (s)=>{return s},
            boolean:  (s)=>{return s},
            object:   (s)=>{sa = cursor.convertToText(s); return (sa)}
      };
      return pu(sa, vp[type]);
    };
    pw = (type,elem) => {
      var sa, va, vo;
      if(vTypes.indexOf(type) < 0) type = `object`;
      elem = elem.sort();
      switch (type) {
        case `object`:    va = vo = O2(elem); 
                          vo._=`{${vo.elements()}}`; (vo._ == '{items}')? vo._ = void 0:0;
                          va = (vo._) ? [`/* ${O1(vo).sort()} */`]: [];
                          va = elem.map((v) => `${name}.${v[0]} = ${v[1]};`); 
                          break;
        case `function`:  va = elem.map((v) => `${name}.${v[0]} = ${v[1]};`); 
                          vo = O2(elem); vo._= `${O1(vo).join(`,`)}`;
                          break;
        case `string`:    va = vo = elem.map((v) => `${name}.${v[0]} = "${v[1].hexToString()}";`); 
                          break;  
        default:          va = vo = elem.map((v) => `${name}.${v[0]} = ${v[1]};`); 
                          break;
      }
      sa = va.join(`\n`);
      if((sa != `items`) && va.length) [log(`\n// `+`${type.toUpperCase()}(${va.length}) `), log(`${sa}`)];
      return vo; 
    };
    types = {}, wx = {};
    wx.items = (e.elements().split(` `)[1]).split(`,`);
    wx.items.map((p) => {
      var elem = eval(`e.${p}`);
      var type = typeof elem;
      types[type] = types[type]||[];
      wt[type]    = wt[type]||0;
      wt[type]++;
      types[type].push(pv(p,type));
    });
    /* log(O1(types)) */
    vTypes = ['boolean', 'number', 'string', 'function', 'object'];
    wTypes = {};
    vTypes.map((p) => (!types[p])?0: wTypes[p]=pw(p,types[p]));
    return wTypes;
  };
  this._items = px(this);
  console.log(beautify(vt.join(`\n`), { indent_size: 2, space_in_empty_paren: true }));
}
OP.concatList = function(mode=false) {
  var ni, vsp, vi, v0, vs;
  vsp = this;
  if(mode) {
    'collect.vsp'.onTimer([O3(vsp)]);
    vs = ':collect.vsp'.emitTimer();
    if(vs.length > 1) {
      v0 = O2(vs[0][0].concat(vs[1][0])); 
      delete v0._, delete v0.first, delete v0.seed;
      '-collect.vsp'.onTimer([O3(v0)]);
      vsp = v0;
    }
  };
  ['vsplist'].emTimeSort();

  if(!vsp.length) {
    delete vsp._, delete vsp.seed; 
    vsp = O3(vsp).map((v) => v[1]); 
  };    
  O1(vsp).map((n) => {
    ni=(+n), vi = vsp[ni], delete vi.bod, delete vi.sod, delete vi.eod;
  });    
  vsp[0].bod  = true;
  vsp[ni].eod = true;
  
  vsp.map((v)=> {
    vi={node:{last:0, next:0, node:v, bod:v.bod||false, sod:v.sod||false, eod:v.eod||false}};
    if(vi.node.bod) [vsp.liste=[vi], vsp.first = vi, vsp.np = 0, ['vsp'].emTimeSort()];
    else			      [vsp.liste.push(vi), v0=(vsp.liste.slice(-2))[0], v0.node.next=vi, vi.node.last=v0];
    'vsplist'.onTimer([v.proc.name||'A01', vi.node]);
  });
  [vi.node.next = vsp.first, vsp.liste[0].node.last=vi];
  try {
    [vsp.liste=O2(':vsplist'.emitTimer()), vsp.liste.elements()];
    global._configPuzzleListe = vsp.liste;
  } catch (error) {
    vsp.liste = global.tmpListe;
  };
  [vsp.proc=vsp.first.node.node, vsp.seed=vsp[0], vsp.np=vsp.seed.proc.parm.np, vsp.count=vsp.length];
  vsp.liste.first = vsp.liste[vsp[0].proc.name];
  '-vsplist'.onTimer(vsp.liste);
  return(vsp.liste);
};

AP.makeList = function() {
  var fn, nn, va, vn, vm;
  nn = this.length||10, vn = nn.toVektor();
  va = vn.map((n) => (this[n] || n)); /* eval(`fn=function A${n}(){}`))); */
  vm = vn.map((n) => [{node:n, last:(!n)?(nn-1):(n-1), next:(n==(nn-1))?0:(n+1)}][0]);
  vn.map((n) => [O1(vm[0]).map((m) => vm[n][m] = vm[vm[n][m]]), vm[n].node.value = va[n], vm[n].node.key = n]);  
  vm[0].bod=true, vm[nn-1].eod=true;
  vm.first = vm[0].node;
  vm.list = this;
  return(vm);
};
AP.nextList = function() {
  var fn, nn, va, vn, vm, vo, vv = this;
  if(!vv.length) vv = ['init','next', 10];
  nn = vv[2]||10, vn = nn.toVektor();
  vm = vn.map((n) => [{node:n, last:vv[n%2], next:vv[(n+1)%2]}][0]);
  vo = O1(vm[0]), vm[0].bod=true, vm[nn-1].eod=true;
  return(vm);
};

/* process.status = {
 *   mode: "loop",
 *   time: {...},
 *   ms_default: 250,
 *   ms: 250,
 *   dir: "next",
 *   list: [...],
 * };
 */
 SP.writeSeed = function(seed) {
  var dir, ident, nn, ns, ms, ps, vb; 
  if(!seed) return;
  ps = process.status, dir = ps.dir, nn = ns = 0, ms = ps.ms, vb = seed.take.banner, 
  ident = (ps.restart)? `${seed.name}.${seed.keyTake||0}`: seed.take.list[0].value[1]; 
  O1(vb[1]).map((n) => {cursor.goto(vb[0].x, vb[0].y+(+n)); console.log(vb[1][+n].ec(2))});
  /* [ps.list, seed.take.list]; */
  seed.take.map((v) => v.slice(3).map((w) => {
    if((typeof w == 'object')) 
    if(v[1] >= ident) {
      if((ps.mode != 'stop') && (w[0][1] != '０')) {
        seed.keyTake = w[0][1];
        'timer.process'.on1(setTimeout(() => '_list.process'.emit1(w, seed, seed.take.list), ms*nn)), nn++;
  }}}));
  if (ps.mode.startsWith('loop')) {
    (ps.restart)? (delete ps.restart):0;
    seed.keyTake = seed.take.list[0].value[1];
  };
  if (process.status.mode == 'loop') {
      'timer.process'.on1(setTimeout(() => {
      '_next.process'.emit1();
      ps.list.first = ps.list.first[dir];
  }, ms*nn))}
};

var getBracket = function(n) {
  var nd, ni, np, vi = 0, vv;
  var {hexToDec, decToHex} = su.methods.util;
  if(!su.symbols|| !su.symbols.sign) setBracket(n);
  vv = su.symbols.sign;
  np = ['FF11','2460','2724','2776','2780','278A']
  if((ni=np.indexOf(`${this}`)) >=0) {
      nd = (+hexToDec(np[ni]));
      vi = O1(' '.repeat(9)).map((n, h, s) => {h=decToHex(`${nd+(+n)}`).slice(2); return(vv[`\\u${h}`])});
      (this == 2776)? vi.unshift(vv['\\u24ff']):0; 
      vi = (n && (n >=0))? vi[n]: vi.join('');
  };
  return vi;
};
var setBracket = function(n) {
  var np, pa, vv = {};
  var {hexToDec, decToHex} = su.methods.util;
  pa = (s, n, m, d, h, v) => [d=(+hexToDec(`${s}`))+(+n),h=decToHex(`${d}`).slice(2),eval(`v ='\\u${h}'`),[m+h, v]].slice(-1)[0];
  np = ['FF11','2460','2724','2776','2780','278A']
  np.map((s) => {O6(vv, O2(O1(' '.repeat(9)).map((n) => pa(s,n,'\\u'))))});
  O6(vv,O2([pa(`24FF`, 0, '\\u')]));
  su.symbols = su.symbols || {};
  su.symbols.sign = vv;
};
"toBracket".get(SP, getBracket); 
"toBracket".set(SP, setBracket);
/* ['FF11','2460','2724','2776','2780','278A'].map((s)=> console.log([(s.toBracket())])); */

var appendOnCursor = function appendOnCursor(){
  var vv = [], vw = {}, vs = O6(se, su); 
  vv = [...new Set(vv.concat(...O1(se), ...O1(vs)).sort())].filter((s) => (s!='_'));
  vv.map((s,t) => [t=typeof vs[s], vw[t]=vw[t]||[], vw[t].push([s,vs[s]])]);
  vw = O2(O1(vw).map((s)=> [s, O2(vw[s])]));
  vw.cproto = cursor.getPrototype();
  O6(cursor, vw.object);
  cursor.files = vw.string;
  O6(vw.cproto, vw.function);
}
"appendToCursor".get(cursor, appendOnCursor); 
cursor.appendToCursor();
cursor.elements();

/**
  * SP.wnumber
  * Returns the numbers in words e.g 325 should return three two five.
  * @returns {String} string form of numbers
  * @test    console.log('rand'.wnumber(3));
*/
NP.unumber = function wnumber(n=0) {
  var na=this, vn = [(0).wnumber(),(1).wnumber(),(2).wnumber()];
  vn.loop   = {n:(vn.length).toVektor(), m:(vn[0].length).toVektor()};
  vn.loop.v = vn.loop.m.map((m)=> [vn[0][m],vn[1][m],vn[2][m]]);
  vn = vn.loop.v[na];
  vn = (!n)? vn:vn[n-1];
  return(vn);
};
NP.wnumber = function wnumber() {
  var va = [[...'⓿❶❷❸❹❺❻❼❽❾'], [...'🄌➊➋➌➍➎➏➐➑➒'], [...'０１２３４５６７８９']];
  return(va[this]);
};
SP.wnumber = function wnumber(id=0, ns=0) {
  var nn, nr, wdigit, words, dvar, str = this;
  words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  'digits' .add(wdigit={}, [words, (0).wnumber(), (1).wnumber(), (2).wnumber()]);
  if(!this.isDigit()) {
    nn = 0, dvar = new Array(9).fill(0); 
    while(dvar.indexOf(0)>=0) {
      nr = (9).getRandomInt();
      if(!dvar[nr]) dvar[nr] = ++nn;
    };
    str = dvar.join('');
  };
  dvar = str.slice(ns).replace(/\d/g, n => `${wdigit.digits[id][+(n[0])]} `).trim();
  return(dvar);
};
SP.numbrFrame = function(op, na=2) {
  var cursor, nx,ny, sa, sb, va, vn, v9;
  sa = ['┏━┳━┳━┓\n┃1┃2┃3┃\n┃4┃5┃6┃\n┃7┃8┃9┃\n┗━┻━┻━┛\n',
        '┏━┳━┳━┳━┳━┳━┳━┳━┳━┓\n┃1┃2┃3┃4┃5┃6┃7┃8┃9┃\n┗━┻━┻━┻━┻━┻━┻━┻━┻━┛\n',
        '┃1┃2┃3┃4┃5┃6┃7┃8┃9┃\n'][na];
  v9 = (10).toVektor(1);
  vn = (1).wnumber();
  va = v9.map((n,v)=> [eval(`v=this.match(/${n}{1}/g)`),[`${n}`,`${vn[(!v)?0:(9-v.length)]}`]][1]);
  sb = sa, va.map((v)=>sb=sb.replace(v[0],v[1]));
  v9.map((n)=> sb=sb.replaceAll(vn[n],n));
  if(op && op.n) { 
    ny = op.y; cursor = ''.cursor(); nx = (op.n<<1)-1;
    sb.split('\n').map((s)=> cursor.gowrite(op.x, ny++, s.ec(1)));
    (!op.n)?0:cursor.gowrite(op.x+nx, op.y, sb[nx]);
  };
  return(sb);
};

class GlobalVar {
  init(){
    global.CHR = function CHR(ord, lower=false, base=65, smal=97) { return String.fromCharCode(((lower)?smal:base) + ord)}; 
    global.ORD = function ORD(chr, lower=false, base=65, smal=97) { return  chr.charCodeAt(0)-((lower)?smal:base)};
    NP.CHR = function(){return(CHR(this))};
    SP.ORD = function(){return(ORD(this))};
    /* console.log((25).CHR()); */
    /* console.log( 'Z'.ORD()); */
    'types'  .add(methods, st); 
    'symbols'.add(methods, ['\u2588' /* █ */, '\u2591' /* ░ */, '\u2606' /* ☆ */]);
  };
  constructor() {
    this.className = GlobalVar.name;
    ['init'].prevFunction({steps:this});
  };
};
new GlobalVar();

O6(su, {
    argv: minimist(process.argv.slice(2))
  , fb:   (border)? border.frameBorder:void 0
  , fd:   (border)? border.frameData  :void 0
  , CHR
  , ORD
  , seed1
  , seed2
  , seedt
});

// "(59) AP,CHR,Emitter,FP,GkListener,JP,JS,NP,O1,O2,O3,O4,O5,O6,OP,ORD,SP,
// ansi,argv,assert,beautify,box,colors,consola,curry,cutil,diff,each,eansi,em,events,
// fb,fd,fs,funcloc,letter,lodash,methods,minimist,mouseEv,path,progress,readline,
// seed,seed1,seed2,seedt,semver,silver,sizeof,solver,sudoku,symbols,thenify,types,
// unicsub,unumber,util,vars" <= su.elements();

module.exports = {...su};

var vs = (v) => (v.elements()).split(' ')[1];
vs = [AP,OP,SP,cursor].each(vs).join(',').split(',').sort();
vs = `(${vs.length}) ${vs.join()}`;

if(require.main)
    cursor.relFileName(__filename, module.exports, require.main.filename == __filename);