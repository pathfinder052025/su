/*jslint node: true, for: true */
'use strict';

var events  = require('events');
var debug   = 0;
var log     = (debug)? console.log:()=>{};

class Emitter extends events.EventEmitter {
    constructor() {
        super();
        this.className = Emitter.name;
        this.eventMap  = new Map();
    };
    on(event, callback, option) {
        var ev = event.slice(1);
        switch(event[0]) {
            case `.`: return this.onEval  (ev, callback);
            case `+`: return this.onString(ev, callback);
            case `-`: return this.onSet   (ev, callback);
            case `X`: return this.onAbort (ev, callback, option);
            case `T`: return this.onTimer (ev, callback, option);
            default:  this.insert(event);
                      log(`[on]:${event}`);
                      this.eventMap.get(event).push(callback);
        };
        return(callback);
    }
    off(event, callback) {
        if (this.eventMap.has(event)) {
            const callbacks = this.eventMap.get(event).filter(cb => cb !== callback);
            log(`[off]:${event}`);
            this.eventMap.set(event, callbacks);
        }
    };
    emit(event, ...data) {
        var ev, e0; // data
        try {
            ev = event.slice(1);
        } catch (error) {
            console.log(error.message);
            throw new Error(event);
        }
        switch(e0=event[0]) {
            case `?`: return this.help();
            case `-`: return this.emitGet      (ev);
            case `+`: return this.emitLength   (ev);
            case `%`: return this.emitLengths  (ev, ...data);
            case `:`: return this.emitArray    (ev, ...data);
            case `_`: return this.emitBack     (ev, ...data);
            case `#`: return this.emitData     (ev, ...data);
            case `*`: return this.emitSignal   (ev, ...data);
            case `!`: return this.emitTime     (ev, ...data);
            case '０':return this.emitTimeStop (ev, ...data);
            default:  
                if (this.eventMap.has(event)) {
                    this.eventMap.get(event).forEach(callback => {
                        if(callback && (typeof callback == 'function')) {
                            log(`emit:[${event}]`);
                            setTimeout(callback, 0, ...data); data;
                        } else return;
                        /*  var err = `ERROR:[${event}]`; 
                         *  console.log(err);
                         *  throw(err)
                         */
                })}
        }
    }
    insert(event) {
        if (!this.eventMap.has(event))
            this.eventMap.set(event, [])
    }
    delete(event) {
        if (this.eventMap.has(event))
            this.eventMap.set(event, [])
    }
    help() {
    }
    clearAllEvents() {
        this.eventMap.clear();
    }
    keys() {
        var {O1,O2} = {O1:Object.keys,O2:Object.fromEntries};
        return (O1(O2([...this.eventMap.entries()])));
    }
    sort(clsEvent) {
        var va, vc, vd, vn;
        var {O1,O2} = {O1:Object.keys,O2:Object.fromEntries};
        var pv = (e,b=true) => {(typeof clsEvent == `string`)? b : clsEvent.map((v) => e.startsWith(v)?b=false:0); return b};
        clsEvent = clsEvent||'0';
        va = this.eventMap.entries();
        vd = [];
        do {
            vc = va.next(); 
            if(vc.value)
            if(vc.value[1].length)
            if(pv(vc.value[0])) vd.push(vc.value);    
        } while(!vc.done);
        va = O2(vd); vn = O1(va).sort();
        this.eventMap.clear();
        vn.map((n) => va[n].map((v) => this.on(n, v)));
        this._events = this.keys().join();
        this._events = `(${this.keys().length}) ${this._events}`;
        this._eventsCount = O2(vn.map((n) => [n, va[n].length]));
        return(O1(this._eventsCount));
    };
    onEval(event, data) {
        log(`${event} = ${data};`);
        this.on(event, eval(data));
    };
    onString(event, data) {
        log(`${event} = ${data};`);
        this.on(event, data.toString());
    };
    onSet(event, data) {
        this.delete(event);
        this.on(event, data);
        return(data);
    };
    emitSignal(event, ...data) {
        event = data.shift();
        var mode = data[0];
        if(typeof mode == 'number')
            mode = (mode==-2)?`end`:(mode==-1)?`start`:(!mode)?`prefix`:`suffix`;
        if (this.eventMap.has(event)) {
            this.eventMap.get(event).forEach(callback => {
                if(typeof callback == 'function') {
                    event = event.match(/(\w+)\.(\w+)/)[0];
                    callback(mode, event, ...data)
                }
        })}
    };
    emitBack(event, ...data) {
        if (this.eventMap.has(event)) {
            var nn=0, va = [];
            this.eventMap.get(event).forEach(callback => {
                if(typeof callback == 'function') 
                    va[nn++] = callback(...data);
                else 
                    return [event];
            });
            return (nn==1)? va[0]: va;
        }
    }
    emitArray(event, data) {
        var nn=0, va = [];
        if(this.eventMap.get(event)) {
            this.eventMap.get(event).forEach(back => {
                va[nn++] = back;
            })
            if(data) data.value = va;
            try {
                va = va.toArray();
            } catch (error) {
                return(va);	                
            }
        }
        return (nn==1)? va[0]: va;
    }
    emitData(event, data) {
        var nn=0, nm=0, va = [], data = data||{};
        if(this.eventMap.get(event)) {
            if(data) {
                this.eventMap.get(event).forEach(back => {
                    (typeof back == 'string')?   va[nn++] = back:
                    (typeof back == 'function')? va[nn++] = back:
                    (Object.keys(back)).map((s) => data[s] = back[s]);
                })
                if(!nn) va = data; 
            } else {
                va = this.eventMap.get(event);
                nn = va.length;
                va = (nn==1)? va[0]: va;
            };
            return va;
        }
        return 0;
    }
    emitGet(event, ...data) {
        if (this.eventMap.has(event)) {
            this.emit(event, ...data);
            this.delete(event);
        }
    }
    emitLength(event) {
        return((this.eventMap.get(event))? this.eventMap.get(event).length:-1);
    }
    emitLengths(event, ...data) { /* data */
        var va, vc, {O1,O2} = {O1:Object.keys,O2:Object.fromEntries};
        var isEmpty = (obj) => {return(O1(obj).length)};    
        if(!event) return(O2(O1(O2([...this.eventMap.entries()])).map((v) => [v,this.emit(`+${v}`)])));
        va = this.emit(`:${event}`)||[]; 
        vc = this.emit(`#${event}`)||{}; 
        vc = (!vc || vc.isEmpty()) 
        ? 0
        : (vc.length && data.length)
            ? vc = vc.filter((s) => (s == data[0])).length 
            : (!data.length && va.length)
                ? va.length
                : 0;
        va = vc;
        return(vc);
    }
    emitTimeStop(event, ...data) {
        var ev, ke, na;
        ev = `timeoutID:${event}`, na = 0; 
        ke = {_:this.keys(), ev:ev.split(':').slice(0,-1).join(':')};
        ke.re = eval(`/^${ke.ev}/g`);
        ke.ew = ke._.filter((s)=>s.match(ke.re)).sort().reverse(), 
        ke.ne = ke.ew.length;
        if(ke.ne) {
            ke.ew.forEach((ev)=> 
                {if(this.eventMap.has(ev)) {
                  this.eventMap.get(ev).forEach(back => {
                    if(back[1]._onTimeout) {
                        clearTimeout(back[1]), na++; 
                }});
                if(na) this.sort([ev]), na=0;
            }});
            if(this.eventMap.has(`callback:${event}`)) return(this.emit(`callback:${event}`, ...data))
        };
        return(na);
    }
    emitTime(event, duration=0, ...data) { // data
        if (this.eventMap.has(event)) {
            this.eventMap.get(event).forEach(callback => {
                this.on(`timeoutID:${event}`, [event, setTimeout(callback, duration, ...data)]);
            })
        }
    }
};

module.exports = {em:(new Emitter), Emitter};
