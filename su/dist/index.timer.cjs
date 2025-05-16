/*jslint node: true, for: true */
'use strict';

         require('../dist/index.lists.cjs');
var su = require('../dist/index.parts.cjs');
var sk = require('../dist/index.unicode.cjs');

var {AP,O1,O2,O3,O6,JP,JS,SP,argv,border,duration,methods,cursor} = su.wb;
var {unicode, unisign} = sk;
var {consola,em,GkListener,moment,readline} = methods;

SP.onTimer        = function(f,v,p) {(!v)?0:v[p]=f; (typeof f == 'function')?f.funcloc():0; return (em.on(this, f))};
SP.emitTimer      = function(...p)  {return (em.emit(this, ...p))}; 
SP.emitTimerStop  = function(...p)  {return (em.emitTimeStop(this, ...p))}; 
AP.emitTimerStop  = function(v)     {v.map((s)=> s.emitTimerStop())}; 
AP.emTimerSetKey  = function()      {((typeof this[0] == 'string')? [this]: this).map((v) => '_onKeys'.emitTimer(v))}; 
SP.emTimerLengths = function(...p)  {return (em.emitLengths(this, ...p))};
AP.emitTimerSort  = function(...p)  {return (em.sort(this))}; 
AP.wday           = function()      {return(`${moment.weekdaysMin(moment().format())}`+moment(this[0]).format(` DD.MM.YYYY HH:mm:ss.SSS`))};
AP.box            = function(x,y,s) {x=x||1, y=y||5, s=s||Timer.wday(), cursor.goto(x,y); consola.box(s)};

/* ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

class TimerMessure {
	get base        () {return (mo) => {this.timer(mo)}};
	get date        () {return (t,p)=> {this.base("time"); p=this.vtimer; t=setTimeout(this.date, 1000);  p.time=p.time||[]; p.time.push(t)}};
	get exit        () {return ()   => {this.base("exit")}};
	get handleInput () {return (chunk, key, p) => {(!(this.tabHI[key.name]))? 0: (typeof (p=this.tabHI[key.name]) == 'function')? p(): 'exit'.emitTimer()}};
	get next        () {return ()   => {this.base("start")}};
	get offTimmer   () {return (p)  => {O1(this.vtimer).map((s) => (!(p=this.vtimer[s]))? 0: p.map((t) => clearTimeout(t)))}};
	get onKeys      () {return (vk) => {this.tabHI[vk[0]] = vk[1]}};
	get restart     () {return ()   => {this.base("restart")}};
	get reproc      () {return ()   => {this.base("reproc")}};
	get runs        () {return (t,p)=> {this.base("runs"); p=this.vtimer; t=setTimeout(this.runs, 100); p.runs=p.runs||[]; p.runs.push(t)}};
	get setHI       () {return (handleInput) => {this.input.on('keypress', handleInput||(()=>{}))}};
	get start       () {return ()   => {this.base("time")}};
	get timer       () {return ()   => {this.base("cls");  this.start(); this.next(); setTimeout(this.base, duration, "cls")}};
	get onKeyp      () {return ()   => {this.timer("onKeypress")}};
	get wait        () {return (start=new Date().getTime()) =>{while(new Date().getTime() < start+Number(this[0]));}}

	start_tm() {
		this.vtimer  = {};
		this.tabHI   = {}; 
		this.labels  = [`Starting`,`Running`,`Process_time`];
        this.enable  = false;
        this.isClock = 0;
		this.started = true;
        this.em      = em;

		'messureOn'   .onTimer((n)  => this.messure(1,0,n));
		'messureOff'  .onTimer((n)  => {return this.messure(0,0,n)});
		'oneSecond'   .onTimer((s)  => {return this.messure(1,1,s||'viewdate')});
		'oneSecondMes'.onTimer((s)  => {return this.messure(0,1,s||'viewdate')});
		'initProcess' .onTimer(()   => this.init());
		'timer'       .onTimer(()   => ()=>{this.timer(); p=0});
		'base'        .onTimer((mo) => {return this.timer(mo)});

		'clearscr'    .onTimer(cursor.clearScreen); 
		'onKeys'      .onTimer(this.onKeys);
		'onKeypress'  .onTimer(this.onKeyp);
		'cursor.view' .onTimer({view:true});

		['cls','init','reproc','restart','runs','exit'].map((s) => s.onTimer(() => {return this.timer(s)}));
		em.sort();
		cursor.initProcess = () => 'initProcess'.emitTimer('#initProcess');
	};
	init() {
		this.input = process.stdin;
		this.input.resume();
		readline.emitKeypressEvents(this.input);
		if (this.input.isTTY) this.input.setRawMode(true);
		this.input.on('keypress', this.handleInput||(()=>{}));
		[["escape", this.exit]
		,["return", this.restart]].emTimerSetKey();
		this.enable = true;
		'init:tk'.emitTimer(this);
	};
	messure(mode, duration, name) {
		var time, pr = process;
		pr.hrMessure = pr.hrMessure||{};
		if (mode == 1) return pr.hrMessure[name] = pr.hrtime();
		time = pr.hrtime(pr.hrMessure[name]);
		time = +(time[0] + time[1] / 1e9).toFixed(3);
		return (duration)? ((time-duration > 0)? 1: 0):`${time}`.padEnd(5,'0');
	};
	timer(mo=0) {
		var pos, ts, co, kp, now, nt, td, tt, tv;
		pos = (mo) => {(mo > 0)? cursor.write(cursor.ansi.store):(mo < 0)? cursor.write(cursor.ansi.restore): 0; 
					  return cursor.goto(border.frameData.width+20, 1)};
		switch(mo) {
			case 0: if(!console.enable) {
					  cursor.initProcess();
					  console.time();
					  O1(this.labels).map((n) => console.time(this.labels[n]));
					  console.enable = true;
					  this.base("clock");
					  break;
					};
					setTimeout(() => {'_clearscr'.emitTimer()}, 1000);
					this.restart();
					this.messure(1);
					'oneSecond'.emitTimer();
					break; 
			case "init":
					'clearscr'.emitTimer(); 
					this.next();
					'!restart'.emitTimer(1000);
					break; 
			case "reproc": 
					if(cursor.reproc) 
						if(typeof cursor.reproc == 'function') cursor.reproc();
						else cursor.reproc.map((pa) => pa());
					break; 
			case "restart":
					if(!console.enable) '_base'.emitTimer(0);
					pos(1);  console.timeEnd(this.labels[1]);
					pos(0);  console.time(this.labels[1]);
					pos(0);  console.timeLog(this.labels[1]);
					pos(-1);
					break; 
			case "runs": 
					if(console.enable){
						cursor.write(cursor.ansi.store); 			
						pos(0); console.timeLog(this.labels[1]);
						pos(-1);
					};
					// break;
			case "clock": 
					if(console.enable) {
						if(this.started || '_oneSecondMes'.emitTimer()) {
							this.started = false;
							if(!console.isClock) {
								this.messure(0);
								this.messure(1);
							};
							cursor.goto(59,1).write((25).space());
							if(kp=console.keypress) {
								if(!kp.circ) {
									kp.circ = ()=> {
										cursor.goto(85,1).write((kp.vc[0][0]).padEnd(11,' '));
										kp.vc[0].arrayShift(); 
										setTimeout(kp.circ, 250);
									};
									kp.circ();
								};
							};
							console.isClock = 2; nt = 96;
							now =  new Date();
							co  =  cursor.ansi.escapeColor, td = now.toDateString(), tt = now.toTimeString();
							ts  = `${td.slice(0, 15)} ${tt.slice(0, 9)}`; // `${}`
							ts  = `${co(ts.slice(0,ts.length-9),6)}${co(ts.slice(ts.length-9, ts.length-1))}`;
							[pos(1).clearLine(nt, 1), cursor.drawLine("bg-blue", nt, 1, ts.trim()), pos(-1)]; 
							'oneSecond'.emitTimer();
					}};
					break; 
			case "time": 
					this.base("clock");
					if(':viewdata'.emitTimer().length) {
						if((tv=':cursor.view'.emitTimer()).length) {
							if(global.vsp) {
						 		if(vsp.one && tv.view === true) {
									'viewdata'.emitTimer();
					}}}};
					break; 
			case "onKeypress": 
					if(cursor.proc) {
						if(cursor.proc[0].parm.press) { 
							delete cursor.proc[0].parm.press;
							'-cursor.view'.onTimer({view:false});
							if(cursor.proc.name)
							  [0,1,2,3,4].map((nt) => {
								try { setTimeout(()=> {
									if(cursor.proc) O1(cursor.proc).map((n,p) => 
										(!(p=cursor.proc[+n].parm))
											? cursor.proc[+n]()
											:(cursor.proc[+n].name == 'keypress')
												? 0 
												: (!cursor.proc[nt])
													? 0
													: (cursor.proc[nt])(p)
								)})} catch(e) {};
							});
						};
					};
					break; 
					[20].wait();
			case "start": 
					if(!console.enable) '_base'.emitTimer(0);
					cursor.goto(border.frameData.width+20, 1); 
					if(this.labels[0]) {console.timeEnd(this.labels[0]); this.labels[0] = 0};
					cursor.goto(1, 1);
					setTimeout(this.date, 100);
					setTimeout(this.runs, 100);
					if(cursor.handleInput)
						this.setHI(cursor.handleInput);
					break;
			case "cls": 
					'_clearscr'.emitTimer();
					break;
			case "exit":	
					this.offTimmer(); 
					pos(); console.timeEnd(this.labels[1]);
					[1000].wait(); 	
					this.base("cls");	
					cursor.goto(1, 1);
					console.timeEnd(this.labels[2]);
					cursor.reset();
					process.stderr.write(cursor.ansi.show);
					process.exit();
		}
	};
	constructor() {
		this.className = this.constructor.name;
		this.start_tm();
	};
}

/* ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */
// `-kdb.proc:listener`.onTimer(()=>{})
// `-kdb.proc:loop`    .onTimer(!`#kdb.proc:loop`.emitTimer());
//  var a='tab'; `-kdb.proc:${a}`.onTimer((va)=>{va.t=`#1# ${va.t}`; return(0)});

class TimerKeys extends TimerMessure {
	pwrite(va) {
		var kp, pa, pb, pc, ps, pu, pw, vr;
		kp = (console.keypress = console.keypress || {vc:va['c:v'].map((s)=> va[s]), loop:0});
		if(va.option.vars) kp.outpos = va.option.vars.outpos;

		'wpos'.set(kp, (v)=> va.option.outpos=(kp.outpos=kp.outpos||v));
		'wpos'.get(kp, kp.outpos||va.option.outpos);
		'gpos'.set(kp, (v)=>v);
		'gpos'.get(kp, new GkListener.GlobalKeyboardListener());

		'ppos'.set(kp, (v)=> v);
		'ppos'.get(kp, ()=> {
			var fb, fi, fp, kp;
			fb = su.fb, fb.start = {x:82, y:1}, fi = fb.first, fp = su.fb.pos;
			kp = console.keypress; kp.fb = fb;
			kp.fb.cur = {x:fb.start.x+fi[0]+fp.x, y:fb.start.y+fi[1]+fp.y, sz:cursor.symbols[0]}; 
		});
		
		ps = (p,n=0,s='')=> {(!va.option.outpos)?0:[kp.view=va.option.outpos.view!=false, p.x=va.option.outpos.x, p.y=va.option.outpos.y,va.option.outpos=0];
							 pw(p.x,p.y+n, p.s.space()); pw(p.x,p.y+n, s)};
		pu = (p,s)=>        {pw(p.x,p.y,   p.s.space()); pw(p.x,p.y,   s.padStart(p.s,' '))};
		pw = (x,y,s)=>  	{(!kp.view)?0:cursor.goto(x,y).write(s)};
		pb = (m=0) =>       {(!m)? [['t:box'.onTimer([].box), 'l:box'.onTimer(()=>{'t:box'.emitTimer(), '!l:box'.emitTimer(100)})]]:[pb=()=>{},'l:box'.emitTimer()]};
		pc = () => 			{pb(); (require.main && (require.main.filename == __filename))? pb(1):0}, pc(); 

		if(!kp.mode) [kp.mode={}, kp.mode.takes="alt,control,shift,win,capslock,numlock,scroll".split(',').map((s)=> kp.mode[s]=0), kp.mode.take  = ``];

		'cwrite'.get(kp, (e)=> {
			return(
				(e.name.slice(0,5) == 'MOUSE')? true:
				(e.name == 'ESCAPE')? true:
				(e.name == 'W')? [true,  kp.vc.arrayShift()][0]: 
				(e.name == 'T')? [false, pb(1)][0]: 
				false);
		});
		'gwrite'.set(kp, (e)=> {
			var bk, event, ev, ew, en, name, pk, sa;
			ev = e.rawKey.standardName;
			kp = console.keypress, kp.mode.flag=en=ew=0;
			pk = (process._kdbkey = process._kdbkey || {change:0, take:''});
			if(ev.length) {
				event = e.rawKey.name;
				(ev.match(/(LEFT|RIGHT|LOCK)\s+/))?              [en=(event[0]=='L'?1:2), ew=event.slice(1).toLowerCase()]:0;
				(ev.match(/\s+LOCK/))?                           [en=3,                   ew=event.toLowerCase()]:0;
				(ev.match(/ARROW/))?ew=0:(ev.match(/MOUSE\s+/))? [en=event[0],            ew=event.slice(1,7).toLowerCase()]:0;
				if(e.state != 'DOWN') {
					if(ev.endsWith(' ARROW'))  ev=ev.split(' ')[0];
					if(ev.startsWith('PAGE ')) ev=`page${ev.split(' ')[1]}`;
					vr = kp.data.vkeys[name=ev.toLowerCase().toLowerCase()]||0; 
					if(vr) {
						vr = JP(JS(vr));
						vr.c = O2(O3(kp.mode).filter((v)=>v[1])); 
						if(vr.c.alt)	 vr.d=vr.d+`+a`; 
						if(vr.c.control) vr.d=vr.d+`+c`;
					 	pk.take = vr.c.takes; pk.key = vr; 
						sa = (vr.c.take||'').trim();
						(!vr.d.length)?0: vr.t = `${vr.t}${sa}`;
				}};
				if(ew) {
					kp.mode[ew] = (e.state!='UP')? en: 0;
					kp.mode.takes = "alt,control,shift,win,capslock,numlock,scroll".split(',').map((s)=> kp.mode[s]);
					kp.mode.take  = `[${kp.mode.takes.join('')}] `;
					bk = (kp.mode.take == '[0000000] '); 
					(bk)? kp.mode.take = '':0;
					(bk)? 0:[pk.take = kp.mode.take, pk.change = 1];
				};
//				(!pk.key)?0: kp.kwrite(pk.key);
			};		
		});
		'gwrite'.get(kp, kp.gpos.addListener(function gpos_addListener(e, down) { 
			var np, kp, p, pb, pk;
			kp = console.keypress, p = kp.wpos, pk = process._kdbkey;
			pb = (e)=> `${e.name} ${kp.mode.take}${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`.padStart(p.s,' '); 
			if(`#kdb.proc:listener`.emitTimer()) {`kdb.proc:listener`.emitTimer(e, down); return};
			if(kp.cwrite(e)) return;
			kp.gwrite = e;
			if(!kp.mode.flag) {
				kp.t2 = kp.t2 || [];
				if(kp.t2){while(kp.t2.length) clearTimeout(kp.t2.pop())};
				  ps(p,0), (!p.view)?0:[ps(p,1,pb(e))], 
				kp.t2.push(setTimeout(()=>{ps(p,0),ps(p,1)}, 1*1000));
			};
			if(pk) 
			if(pk.change) {
				kp.t3 = kp.t3 || []; 
				if(kp.t3){while(kp.t3.length) clearTimeout(kp.t3.pop())};
				np = 2; pk.change = 0;
				O1(pk).map((s)=> { 
					if(pk[s]) {    
						sk = (typeof pk[s] == 'string')?pk[s].trim().padStart(50, ' '):'';
						ps(p,(np++),sk);
						kp.t3.push(setTimeout(()=>{(5).toVektor(2).map((n)=>ps(p,n))}, 1*1000));
						(s=='take')?pk[s]=0:0;
			}})};
		}));
		'kwrite'.get(kp, function kwrite(key) {
			var kp, va, vp;
			kp = console.keypress, vp = kp.wpos;
			va = (typeof key == 'string')? `:kdb.parm:${key}`.emitTimer():key;
			va.t = `${va.b} ${kp.mode.take}[${va.m}:${va.a}][${va.x},${va.y}][${va.s}]`;
			if(`#kdb.proc:${va.a}`.emitTimer()) {if(`_kdb.proc:${va.a}`.emitTimer(va))return};
			if(`#kdb.proc:${va.l}`.emitTimer()) {if(`_kdb.proc:${va.l}`.emitTimer(va))return};
			if(`#kdb.proc:keys`.emitTimer())    {if(`_kdb.proc:keys`   .emitTimer(va))return};
			if(!vp.view) return;
			pu(vp,va.t);
		});
		'kerror'.get(kp, function kerror(mode, key) {throw new Error(`[${mode}][${key}]`)});
		pa = kp.gpos.listeners[0]; pa;
	};
	proc(v) {
		var s, s4, vp;
		s = JP(JS(v));
		vp = '#onKeys'.emitTimer()[0];
		s.unshift(isFinite(s[1])?(+s[1]):`'${s[1]}'`);
		s4 = s[3];
		s4.fh = vp.toString().replace(/[\t\s]/g,'');
		s4.fc = `function _${s[3].l}(vk){console.keypress.${s[3].l}=${s[0]}}`;
		s4.fs = `console.keypress.${s[3].l}=(vk) => {self.keypress=['${s[3].m}',vk]}`;
		s4.fk = `'${s4.l}'.set(console.keypress, (vk)=>console.keypress.kwrite(vk))`;
		s[0]  = eval(s[0]);
		if(!console.keypress[s[3].l]) eval(s4.fk);
		eval('s[1] ='+s4.fc); s[1].proc = s4.fc; s[1].parm = v[2] = s4;
		      s[2] = vp;      s[2].proc = s4.fh;
		[s].each(s[2]);
		'kdb.parm'.onTimer([s[0],s4]);
		`kdb.parm:${s[0]}`.onTimer(s4);
		O6(v[2], {pc:s[1], ph:s[1], pk:s[2]});
		return([`${v[2].m}_${v[2].a}`, v[2]]);
	};
	start_tk(self) {
		var op, ps, va, vd;
		ps = (s)=> unicode.split(s,'');
		va = {
			 option: self.option
			,'a-z':  unisign.latin_A
			,'0-9':  unisign.latin_N
			,'A.Z':  unisign.alpha_A8 
			,'a.z':  unisign.betha_a8 
			,'0.9':  unisign.number_N8
			,'c:1':  [...unisign.face.C1]
			,'c:2':  [...unisign.face.C2]
			,'c:3':  [...unisign.face.C3]
			,'c:4':  [...unisign.face.C4]
			,'c:5':  [...unisign.face.C5]
			,'c:v':  ['c:1','c:2','c:3','c:4','c:5'] 
			, pos:   {m:'',a:'',b:'',n:false,s:'',x:0,y:0}
			, kdb:   []
			, kdc:   []
		};

		vd = __filename.readSign(); 
		op = vd.CONFIG.option;
		if(op.delay) {va.option.delay=op.delay; 'exit'.runTimer(va.option)};
		vd = vd.CONFIG.keys;
		va.kda = O1(vd).map((s)=> [s, ...vd[s]]).map((v)=> [v[2]=ps(v[2][0]),v][1]);
		va.kda[2][2] = [...(vd[va.kda[2][0]][1][0])];
		[[0,10],[2,26]].map((v) =>{va.kda[v[0]][3]=eval('['+(JS(va.kda[v[0]][3][0])+',').repeat(v[1])+']')});

		self.pwrite(va);
		O1(va.kda).map((m,v, w)=> [
			v = va.kda[m], v = O1(v[1]).map((n)=> [w = JP(JS(va.pos)), 
			w.m=v[0], w.a=(isFinite(v[1][n]))?(+(v[1][n])):v[1][n], w.b=v[2][n], w.c={}, w.d='', w.l=v[0].toLowerCase(), 
			w.t=`${w.b} [${w.m}:${w.a}][${w.x},${w.y}][${w.s}]`, 
			va.kdb.push([v[0], v[1][n], O6(w, v[3][n])])])
		][1]);
		va.kdb = va.kdb.slice(1);
		va.kdb = O2(va.kdb.each(self.proc));
		va.kdc = O1(va.kdb); delete va.pos;
		va.kdd = va.kdc.map((s,v) => [v=s.split('_'), [v[0], isFinite(v[1])?(+v[1]):v[1], va.kdb[s]]][1]);
		O6(console.keypress.data={}, {vkeys:O2(va.parm=':kdb.parm'.emitTimer())});
		O6(console.keypress.data, va);
		va = {keys:va.kdc, value:va.kdd, press:va.kdb, data:console.keypress.data};
		
		O1(va).map((s) => `kbdKeys.${s}`.onTimer(va[s])); 
		va.keys = O1(''.emTimerLengths()).filter((s) => (s.startsWith('kbd')));
		O6(self, va); 
		if(process.em.emit(`#kdb.kda:proc`)) [va.kp=console.keypress, process.em.emit(`_kdb.kda:proc`, va)];
	};
	constructor(option) {
		super();
		this.className = TimerKeys.name;
		this.option    = option;
		'init:tk'.onTimer(this.start_tk);
	};	
};

/* ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

class Timer extends TimerKeys {
	constructor(option) {
		cursor = ''.cursor(); 
		super(option);
		cursor.className = this.className = Timer.name;
		'init'.emitTimer(); 
	};
};

'wday'.get(Timer, [new Date()].wday);
// var wday = Timer.wday();
// console.log(wday);
'stopTimer'.get(Timer, function stopTimer(ms, next) {
	if(next) this._exit = next;
	if(next == 'loop' && this.stopTime) {this._exit=ms=next; clearTimeout(this.stopTime); this.stopTime=1000};
	(isFinite(ms) && (ms > 0))? this.stopTime=setTimeout(Timer.stopTimer, ms): Timer.runTimer=Timer._exit;
});
'runTimer'.set(Timer, function runTimer(mode) {
	if(!global.timer) return;
	timer.base(mode);
});
'runTimer'.get(SP, function runTimer(option){
	var ms, op = {delay:60*1000, outpos:{view:true, x:73, y:2, s:50}};
	option = option || {}, O6(op, option), option = op, ms = option.delay;
	if(!global.timer)   {global.timer = new Timer(option); Timer.runTimer = "cls"};
	(this == 'loop')?                       Timer.stopTimer( 0, this):
	((typeof ms == 'number') && ms > 0)?    Timer.stopTimer(ms, this):
	((typeof ms == 'object') && ms.length)? Timer.stopTimer(ms[1], ms[0]):0;
	timer.runs();
});

methods.Timer  = Timer;
methods.elements();
module.exports = su;

/* ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */
if(require.main) {
  	if(argv.test) 
    	process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
	else if(require.main.filename == __filename) {
		var data = __filename.readSign();
		var option = data.CONFIG.option; 
		'exit'.runTimer(option);
	};
};

/* •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
$BOF
$CONFIG
  [option]
	delay  = 60*60*1000
	outpos = {view:true, x:67, y:2, s:50}
  [keys]
    NUM = [[...'0123456789'],				  	['０１２３４５６７８９'], [{n:false}]]
    DEL = [[0],								  	['📥'], [{n:true}]]
    LET = [[...'abcdefghijklmnopqrstuvwxyz'], 	['𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'], [{n:false}]]
    POS = [['up','down','left','right' ],		['⇧⇩⇦⇨'], [{y:-1,s:'last'},{y:1,s:'next'},{x:-1,s:'last'},{x:1,s:'next'}]]
    RUN = [['space' ],							['🙄'], [{s:250}]]
    TAB = [['tab','backspace' ],				['↻↺'],	[{x:1,s:'next'},{x:-1,s:'last'}]]
    END = [['home','end','pageup','pagedown' ],	['⇤⇥⇑⇓'], [{s:'first'},{s:'last'},{s:'up'},{s:'down'}]]
$URL
  Windows_OS_Virtual_Key_Codes  = 'https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes'
$EOF
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */