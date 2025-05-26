/*jslint node: true, for: true */
//'use strict';

var sp, st, su;
su = require('su');
sp = su.moduls.parts;
st = su.moduls.vars;

var {O1,O2,O3,O6,JP,JS,methods} = su;
var {floor} = methods.lodash;

class F9x9 {
  get pc()     {return((v)=> {return([...v].map((c)=> isFinite(c)?((+c)+26).CHR():'.').join(''))})};
  get pm()     {return((v,c)=> v.join('').split(c))};
  get pn()     {return((s)=> `${s}${s}${s}`)};
  get pp()     {return(this.getSolvePp())};
  get ps()     {return((s,n)=> (!n)?s.convertOrd():s.convertChr())};
  get pt()     {return((v,t)=> {('naosb'.indexOf(t=(typeof v)[0])); return(((t==2) && (v.length==1))?(--t):t)})};
  get pv()     {(n)=>{var m=0; return([...'0'.repeat(n)].map(()=>(m++)))}};
  set pv(n)    {var m=0; return([...'0'.repeat(n)].map(()=>(m++)))};
  get pz()     {return((n)=> {return((n)?'t:solve'.timerOn():'t:solve'.timerOff())})};
  get v9()     {return( (9).toV())};
  get v09()    {return( (9).toV(1))};
  get v10()    {return((10).toV())};
  get v81()    {return((81).toV())};
  get wa()     {return(this.v09.map((n)=> (n-1).CHR(0)))};
  get wa()     {return(this.v09.map((n)=> (n-1).CHR(0)))};
  getSolvePp() {return(this.getPrototype())};
  
  get w9x9() {return(na, nb) => {
    var pa,pb,pc,pd,pe,pk,pn,pm,po,pw;
    var nb,sa,sz,va,vb,vc,vd,wa,wb,wr,wu,s,w;
    
    pa = (s)=> {w=[s[0],s.slice(1)]; w[2]=w[0].repeat(w[1]); return(w[2].replaceAll('_',' '))};
    pb = (s)=> {return(s.join('').split(','))}; 
    pc = (v)=> {return(v.map((w)=>(w.repeat(3)).slice(0,-1)+',1'))};
    pd = (v)=> {return(v.match(/(.)\d{1,2}/g))};
    pe = (v)=> {(na)?0:[wr.map((w)=> v=v.replaceAll(eval(`/${w[1]}/g`),`${w[0]}`))]; return(pb(pd(v).map((s)=> pa(s))))}
    pk = (v)=> [s='', v.split(',').map((w) => s+=`${sz}${w},1`),s][2];
    pn = (v)=> [s='', v.split(',').map((w) => s+=`${w[0]}1${w[1]}26${w[2]}1,1`),s][2];
    pm = (v)=> [s='', v.split(',').map((w) => s+=`${w[0]}10${w[1]}1,`),s.slice(0,-1)][2].split(',');
    po = (n)=> [`_1x${n+1}_1x${n+1}_1x${n+1}_1│1`];
    pw = (c)=> {w={u:'x',s:'v',t:'w'}[c]; (!w)?w='y':0; return(w)};

    sa = "{Sudoku-Tabelle:XXX}", vb='zcurrrtrrrtrrrs', wr = [[29,38],[23,26],[7,10]];
    wa = (26).convertLet(1); wb=(26).convertLet(2); wa.unshift(...wb.slice(0,2)); 
    sz = ['░','█'][(!nb)?0:1], wu=(1).uniNums();
    vc = pe(pk('38,2')+pn('╔═╗,║_║,╠═╣,╟─╢,╚═╝')+pc(pm('═╤,─┼,═╧'))+pc(po(na)));
    vc = O2(O1(vc.slice(0,-1)).map((n)=> [wa[n], vc[n]]));
    vc.c = (!na)?(pa(`_2`)+sa+pa(`_1`)): (pa(`_6`)+sa+pa(`_6`)); 
    if((na==1) && (nb==1)) vc.z = vc.z.splice(1,0,'═'.repeat(6)); 

    vd = [... vb].map((c,w)=> (c < 'w')?vc[pw(c)].splice(1,wr[1][na],vc[c]):vc[c]);
    va = [vc.A, ...vd.map((v)=> `${vc.B}${v}${vc.B}`), vc.A];
    if(!na) {
      va[1]  =  va[1].splice(4,1,wu[nb]);
      va[1]  =  va[1].splice(wr[0][na]-8, 4, '[nn]');
      va[15] = va[15].splice(wr[0][na]-7, 3, '[z]');
      va[15] = va[15].splice(4, 3, `[${nb}]`);
    };
    return(va);
  }};
  get silver1() {return() => {
    var na, nb, wb, wc, wd, we, v, w, {w9x9, v09, v10, v81, wa, pm, pn} = this; 
    wb = v09.map((n,s)=> [s=`${wa[n-1]}`,(n==3||n==6)?s=`${s},`:0,s][2]);
    wb = pm(pm(pm(wb,',').each(pn),'').each(pn),''); wc = JP(JS(wb)); wa.map((s)=> {na=0; while((nb=wc.indexOf(s))>=0)[na++, wb[nb]=`${wb[nb]}${na}`, wc[nb]=0]});
    wc = v81.map((n)=> [wb[n], n+1, ORD(wb[n][0])+1, floor(n/9)+1, n%9+1, wb[n][0]]), wc.map((v)=> v.push(`R${v[2]}`,`Z${v[3]}`,`S${v[4]}`));/*wc.sort();*/  
    wd = O2([...new Set(wc.map((v)=> [v[0], ...v.slice(6)]).flat().sort())].map((s)=>[s,[]])); wc.map((v)=> wd[v[0]]=v.slice(6)); wa.map((s)=> wd[s]=v09.map((n)=>`${s}${n}`));
    we = O2([wd].pullAt(wa,1).map((v)=> [v[0][0],v])); 
    wc.map((v)=> [0,1,2].map((n)=> wd[v[n+6]].push(v[1])));
    v81.map((n)=>[v=wc[n], w=[...new Set(wd[v[0]].map((s)=>wd[s]).flat())], w.splice(w.indexOf(n+1),1), w.sort(((a,b)=>(a<b)?-1:1)), wd[v[0]]=w]);
    O6(wd, {0:wc, 1:we, a:wa, wa:O2(wd.wb=v81.map((n)=> [wb[n],n+1])), wb:O2(wd.wb.map((v)=>v.arrayShift())), wu:(1).uniNums(), frames:[...v10.map((n)=> w9x9(0, n)), w9x9(1, 1)]});
    return(wd);
  }};
  get silver() {return() => {
    var na, nb, nc, sa, sb, vb, wb, wd, v, w, {v09, v10, v81, wa, w9x9} = this; 
    sa = wa.map((s)=>s.splices([0,0],s)).join('').splices([18,9],',').split(',').map((s)=>s.splices([0,0],s)).join('');
    sb = sa, wa=[...sa], wb=[...sb], wd=[], nc=0;
    wa.map((s)=> {na=0; while((nb=wb.indexOf(s))>=0)[na++, wb[nb]=[`${wb[nb]}${na}`]]}); 
    v81.map((n)=> [v=wb[n], v.push(n+1, ORD(v[0][0])+1, floor(n/9)+1, n%9+1), v.push(v[0][0],`R${v[2]}`,`Z${v[3]}`,`S${v[4]}`)]);/*wb.sort();*/
    wb.map((v)=>wd.push(v[0], ...v.slice(5))); wd=O2(wd.sort().map((s)=>[s,[]])); 
    v81.map((n)=> [v=wb[n], wd[v[0]]=v.slice(6), [0,1,2].map((m)=> wd[v[m+6]].push(v[1]))]);
    vb = O2(wa.map((s)=> [wd[s]=v09.map((n)=> `${s}${n}`),[s,wd[s]]][1]));
    v81.map((n)=> [w=wd[wb[n][0]], w.push(...wd[w[0]],...wd[w[1]],...wd[w[2]]), wd[wb[n][0]]= w=[... new Set(w.slice(3))], w.splice(w.indexOf(n+1),1), w.sort(((a,b)=>(a<b)?-1:1))]);
    O6(wd, {0:wb, 1:vb, a:O1(vb), wa:O2(wb.map((v)=>v.slice(0,2))), wb:O2(wb.map((v)=>v.slice(0,2).arrayShift())), wu:(1).uniNums(), frames:[...v10.map((n)=> w9x9(0, n)), w9x9(1, 1)]});
    return(wd); 
  }};
  get solve() {return((seed)=> {
    var {pp, pz} = this; pp=pp.pp;
    var {se, vp, v10, v81, wa, silver} = this;
    var va, vc, vs, wb, wd, we, wp, b,s,v,w;
  
    pz(1); vp = JP(JS(wp=silver())), vs=vp[0], wa=vp.wa, wb=vp.wb, wd=[], we=[];
    do {
      se = {last:seed, vc:{vk:[...seed], wd:[], vb:[], we:[], wb:[], wa:[w={},vp.a.map((s)=>w[s]=['','',[],[],[]]),w][2], vb:v81.map((n)=>[v=vs[n].slice(0,2),s=seed[n],v.splice(6,0,s,s,[s].types()),v][3])}};
      se.vc.vc = [se.vc.vb].pullAt(v81.filter((n)=> [v=se.vc.vb[n], !v[4]][1]));  
      se.vc.vd =       [vp].pullAt(se.vc.vb.map((v)=>v[0]),1);
      se.vc.vd = [se.vc.vb].pullAt(O1(se.vc.vb).filter((n)=> [v=se.vc.vb[n],w=se.vc.vd[n], v[4]=[v[3]=(w.map((m)=>se.vc.vk[m-1])).unique2()[1]].types(),(v[4]==1)?[v[2]=v[3]=v[3][0]]:[v[2]='-',v[3]=v[3].join('')], v[4]!=1][4]));
      se.vc.vc = se.vc.vc.map((v)=>[v[3]=`${v[3]}${v[3]}`,v][1]);
      se.vc.vb = se.vc.vb.map((v)=>[v[3]=`${v[3]}${v[3]}`,v][1]);
      se.vc.va = [... se.vc.vc,... se.vc.vb,... se.vc.vd];
      se.vc.vb = se.vc.vb.map((v)=> [v[1]-1, v[2], v[0]]);

      v81.map((n)=> [v=se.vc.va[n], v[5]=`${v[0]}:${v[(v[4]==2)?3:2]}`, se.vc.wa[v[5][0]][0]+=v[3], (v[4]!=2)?0:[se.vc.wa[v[5][0]][2].push(v[5].slice(0,2)),se.vc.wa[v[5][0]][3].push(v[3])]]);
      vp.a.map((s)=> [se.vc.wa[s][1] = se.vc.wa[s][0].split('').sort().uniqueA()]);
      vp.a.map((s)=> [v=se.vc.wa[s], O1(v[1]).map((n)=>((O1(v[3]).map((m)=> (v[3][m].indexOf(v[1][n])<0)?0:v[4].push(`${v[2][m]}:${v[1][n]}`))))), (v[4].length)?se.vc.wb.push(v[4]=v[4].join()):0]);
      se.vc.vb.push(...O3(eval(`w={${se.vc.wb.join()}}`)).map((v)=> [vp.wa[v[0]]-1, v[1], v[0]]));
      se.vc.vb.sort((a,b)=>(a[2]< b[2])?-1:1).map((v)=> se.vc.vk[v[0]]=v[1]); 
      se.vc.we = se.vc.vb.map((v)=> `${v[2]}:${v[1]}`).join().padding('{}');
      se.vc.so = `[${[...seed.numCount(),se.vc.vb.length]}]`;
      wd.push([seed, se.vc.so, se.vc.we]), seed=se.vc.vk.join('');
    } while(se.vc.vb.length);
    
    se.vc.so = eval(wd[wd.length-1][2] = `${b=(Math.sum(se.vc.vk.numbers()) == 405)}`);
    (se.vc.so)? [v=[...eval(wd[0][1])], wd[wd.length-1][1] = `[${[81, v[0], v[1], wd.length-1]}]`]:0; 
    O6(wb={}, {vk:se.vc.vk, wa:vp.wa, wb:vp.wb, wu:vp.wu});  
    
    vc = {n:0, vk:[v=[...wd[0][0]], v.push(''),v][2], fr:v10.map((n)=> vp.frames[n].join(';').split('x').map((v)=>v))};
    vc.fr = O1(vc.fr).map((n)=> (O1(vc.fr[n]).map((m)=>`${vc.fr[n][m]}${vc.vk[m]}`)).join('').replaceAll(eval(`/ ${n} /g`), ` ${vp.wu[n]} `).replace('{Sudoku-Tabelle:XXX}',' Sudoku-Tabelle:A01 ').replace(/\[nn\]/,`[${wd[0][0].numCount()[0]}]`).split(';'));

    va = {vc:wb, first:seed=wd[0][0], last:wd.slice(-1)[0][0], frames:vc.fr, pattern:wd, solved:se.vc.so, time:pz(0)};
    va.frames[1].map((s)=> console.log(s)); [5000].wait();
    return(va);
  })};
  constructor(seed) {
    return(this.solve(seed));
  };
};
/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/
module.exports = {F9x9};
if(require.main) {
  if(require.main.filename == __filename) {
    cursor.clearScreen();
    var f9x9 = new F9x9(su.moduls.vars.wa[1]);
    cursor.clearScreen();
  }
};  
/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/