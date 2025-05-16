/*jslint node: true, for: true */
'use strict';
'◒◐◓◑';

const unicsub = require('unicode-substring');
const unicode = require('unicode-string')

const su         = require('../js/dist/index.base.cjs');
const unic       = __filename.readSign();
const {O1,O2,O6} = su;

const {A1,A2,A3,A4,A5,A6,A7,A8,L1,L2,L3,N1,N2,N3,N4,N5,N6,N7,N8,a1,a2,a3,a4,a5,a6,a7,a8} = unic.CONFIG.unicode;
const {A,N} = unic.CONFIG.latin;

const sLatin       = {N,A}
const sNumber      = {N1,N2,N3,N4,N5,N6,N7,N8};
const sLetter      = {L1,L2,L3};
const sAlphaUpper  = {A1,A2,A3,A4,A5,A6,A7,A8};
const sAlphaLower  = {a1,a2,a3,a4,a5,a6,a7,a8};

var vdata = [];
var data  = {latin:sLatin, number:sNumber, letter:sLetter, alpha:sAlphaUpper, betha:sAlphaLower};
O1(data).map((s) => O1(data[s]).map((v) =>vdata.push([`${s}_${v}`, [...(data[s][v])].map((w)=> w)]))) ;
vdata = O2(vdata); 
O6(vdata, data);
vdata.elements();

module.exports = {unicode, unicsub, unisign:vdata};

/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
$BOF
$CONFIG
  [create]
    date    = 'Mar-2025'
	version = {major:1, release:0.01}
  [latin]
	A = 'abcdefghijklmnopqrstuvwxyz'		
	N = '0123456789'
  [unicode]
	N1 		=  '⓪①②③④⑤⑥⑦⑧⑨'
	N2 		=  '🄋⓵⓶⓷⓸⓹⓺⓻⓼⓽'
	N3 		=  '🄌➊➋➌➍➎➏➐➑➒'
	N4 		=  '⓿❶❷❸❹❺❻❼❽❾'
	N5 		=  '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'
	N6 		=  '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'
 	N7 		=  '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'
	N8      =   '０１２３４５６７８９'
	L1		=  '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'
	L2		=  'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'
	L3		=  'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'
	A1      =  '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'
	A2      =  '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'
	A3      =  '𝒜𝒞𝒟𝒢𝒥𝒦𝒩𝒪𝒫𝒬𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'
	A4      =  '𝔸𝔹𝔻𝔼𝔽𝔾𝕀𝕁𝕂𝕃𝕄𝕆𝕊𝕋𝕌𝕍𝕎𝕏𝕐'
	A5      =  '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'
	A6      =  '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'
	A7      =  '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'
	A8      =  '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'
	a1      =  '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'
	a2      =  '𝑎𝑏𝑐𝑑𝑒𝑓𝑔𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'
	a3      =  '𝒶𝒷𝒸𝒹𝒻𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'
	a4      =  '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'
	a5      =  '𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'
	a6      =  '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'
	a7      =  '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'
	a8      =  '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'
	g       =  '𝞪𝞫𝞬𝞭𝞮𝞯𝞰𝞱𝞲𝞳𝞴𝞵𝞶𝞷𝞸𝞹𝞺𝞻𝞼𝞽𝞾𝞿𝟀𝟁𝟂'
$URL
	http://xahlee.info/comp//unicode_index.html?q=A
$EOF
•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/
