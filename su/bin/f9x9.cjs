/*jslint node: true, for: true */
'use strict';

var sp, st, su;

su = require('su');
sp = su.moduls.parts;
st = su.moduls.vars;
 
var {AP,O1,O2,O3,O6,JP,JS} = su;
var f9x9;

class F9x9 {
  get f9x9() {return(()=>{
    var na, nb, va, vb, vc, vr, v09, w81, w27, wa, wb, wc;
    
    va = (" 2█38C┏1A┳1A┳1A┓1█2EEEFEEEFEEEC┗1A┻1A┻1A┛1█2C█36");
    vr = [/(.){1}\d{1,2}|\//g, [[/F/g,"C┠1A╋1A╋1A┨1█2"],[/E/g,"C┃D┃D┃D┃1█2"],[/D/g,"1━B1X2B1"],[/C/g,"/ 2█2"],[/B/g," 1X2 "],[/A/g,"━10"]]];
    va = [vr[1].map((v)=>va=va.replaceAll(v[0],v[1])),va][1];
    vb = va.match(vr[0]).map((v,w)=>[w=v.slice(0,1),+v.slice(1)]).map((v)=> (!v[1])?v[0]:v[0].repeat(v[1])).join('').split('/');
    
    na = 0, v09 = ([...'0'.repeat(9)].map(()=>(++na))), wa=v09.map((n)=> (n-1).CHR(0));
    wb  = v09.map((n,s)=> [s=`${wa[n-1]}`,(n==3||n==6)?s=`${s},`:0,s][2]).join('').split(',').map((s)=>`${s}${s}${s}`); 
    wb  = [...(wb.map((s) => [...s].map((s)=> `${s}${s}${s}`).join('')).join(''))], wc = JP(JS(wb));
    wa.map((s)=> {na=0; while((nb=wc.indexOf(s))>=0)[na++, wb[nb]=`${wb[nb]}${na}`, wc[nb]=0]});
  
    w81 = v09.map((n)=> v09.map((m)=>[(n-1)*9+m,0,n,m])).flat(); w27=[]; 
    w81.map((v)=> {var s; [v[1]=ORD(s=wb[v[0]-1])+1, v.unshift(s), v[5]=s[0], v[6]=`R${v[2]}`, v[7]=`Z${v[3]}`, v[8]=`S${v[4]}`]});
    w81.map((v)=> {w27.push(...v.slice(6))}); w27 = O2([... new Set(w27.sort())].map((s)=> [s,[]])); w27.a = wa;
    w81.map((v)=> [w27[v[6]].push(v[1]), w27[v[7]].push(v[1]), w27[v[8]].push(v[1])]); wa.map((s)=> w27[s]=[]); 
    w81.map((v)=> [v[9]=[... new Set(([...w27[v[6]],...w27[v[7]],...w27[v[8]]]))], v[9].splice(v[9].indexOf(v[1]),1), v[9].sort((a,b)=> (a<b)?-1:1)]);
    w81.map((v)=> [w27[v[0]]= v[9], w27[v[5]].push(v[0]), v[9]=v[9].length]); vc=w81.map((v)=>v[0]), vc.push('');
    
    w27[0] = w81; w27[1] = JP(JS(vb)); vb=vb.join(';').split('XX'); w27[2]=O1(vb).map((n)=> `${vb[n]}${vc[n]}`).join('').split(';');
    w27.wb = O2(O1(wb).map((n)=> [wb[n], (+n)+1])), w27.wa={}, O1(wb).map((n)=> w27.wa[(+n)+1]=wb[n]);
    
    // va = [].silver();
    w27.elements();
    AP.silverValue = w27;
    return(w27);
  })};
  get solve() {return((seed)=>{
    var pc, pz, se, vp, wa, wb, wc, wC, wd, wD, we;
    var n,p,q,v,s,s1,s2,so,t1,t2,w;
  
    pc = (v)=> {return([...v].map((c)=> isFinite(c)?((+c)+32).CHR():'.').join(''))};
    pz = (n)=> {return((n)?'t:solve'.timerOn():'t:solve'.timerOff())};
  
    pz(1);
    vp = AP.silverValue, wa=vp.wa, wb=vp.wb;
    se = {first:seed};
    se.vk = [...se.first], wd=[se.first], we=[0]; 
    
    do {
      O1(se.vk).map((n)=> [n=+n, [se.vk[n], s=wa[n+1],(!n)?[wc=[0],wC=[]]:0, wc[s[0]]=wc[s[0]]||['','']][0], 
      ...[t1=[v=se.vk[n]].types(), (!t1)?[w=`${v}${v}`,t2=0]: w=(t1==3)?([w=vp[s].map((n)=>se.vk[n-1]).unique2()[1],  t2=[w].types(), w=(t2==1)?w[0]:w.join(''), [w,t2]][2]):0, [`${s}:${w}`,t2], wc[s[0]].push(`${s}:${w}`)][2]]);
      vp.a.map((s)=> [wc[s][0]=wc[s].slice(2).map((s)=>s.slice(3)).join('').split('').sort().join(''),wc[s][1]=[...wc[s][0]].uniqueA().join(''), wc[0]+=wc[s][1].length]);
    
      vp.a.map((s)=> [p=[...wc[s][1]], w=[[],[]], [...wc[s].slice(2)].map((v)=> w[(v.length==4)?0:1].push(v)),
        [wC.push(...w[0]), q=(w[0].map((s1)=>s1.slice(-1)).join('')), p=p.filter((s1)=> (q.indexOf(s1)< 0)), w=w[1]],
        w.map((s1)=> [...p].map((s2)=> (s1.slice(3).indexOf(s2)<0)?0: wC.push(`${s1.slice(0,3)}${s2}`))),
      ]);
      wD = wC.map((s)=> [vp.wb[p=s.slice(0,2)]-1, +s.slice(-1), p]); wD.map((v)=> se.vk[v[0]]=v[1]), n=wC.length;
      so = wd.slice(-1)[0].numCount();
      (!n)?[we[0]=[so[0],we[0],we.length-1], we.arrayShift()]:[wd.push(se.vk.join('')), we.push([...so, n, ...wC]), we[0]+=n];
    } while(wc[0]);
  
    wd = O1(wd).map((n)=> eval(`['${wd[n]}',[${we[n][0]},${we[n][1]},${we[n][2]}],{${we[n].slice(3).join()}}]`));
    wd[wd.length-1][2] = {solved:so=(Math.sum(se.vk.numbers()) == 405)};
    se = {name:'A01', first:wd[0][0], last:wd.slice(-1)[0][0], frames:0, pattern:wd, solved:so};
  
    O6(se, {puzzle:pc(se.first), solution:pc(se.last), difficulty:'gener', frames:[se,se.first,se.last].framesSeed(), time:pz(0)});
    return(se);
  })};
  constructor(seed) {
    this.f9x9();
    this.seed = this.solve(seed);
  }
};

/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/
module.exports = {F9x9};

if(require.main) {
  if(require.main.filename == __filename) {
    cursor.clearScreen();
    f9x9 = new F9x9(su.moduls.vars.wa[1]);
    cursor.clearScreen();
  }
};  
/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/
