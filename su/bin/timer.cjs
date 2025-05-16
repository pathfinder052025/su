/*jslint node: true, for: true */
'use strict';

var sk, sp, st, su;
su = require('su');
sk = su.moduls.unicode; 
sp = su.moduls.parts;
st = su.moduls.vars;

var {methods} = sp.wb;
var {Timer} = sp.wb.methods;

methods.Timer  = Timer;
methods.elements();
module.exports = su;

/* ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */
var data = __filename.readSign();
var option = data.CONFIG.option; 
'exit'.runTimer(option);

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