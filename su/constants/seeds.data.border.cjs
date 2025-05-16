'use strict';

const frameBorder = { 
	  col:[5,7,9,13,15,17,21,23,25]
    , row:[5,6,7, 9,10,11,13,14,15]
    , first:[5,5]
    , last:[25,15]
    , pos:{x:0,y:0}
};
const frameData = {
	  width:  28
	, height: 17
	, posX:    3
	, posY:    2
	, dirX:    0
	, dirY:    0
	, cset: true
	, sema: {}
	, semc: {}
};
	
module.exports = { frameBorder, frameData };