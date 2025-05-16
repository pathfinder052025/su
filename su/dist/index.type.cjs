/*jslint node: true, for: true */
'use strict';

             require('../dist/index.lists.cjs');
var lodash = require('lodash');
var types  = lodash.elements().filter((s) => s.startsWith('is'));
var to     = lodash.elements().filter((s) => s.startsWith('to'));
var O2     = Object.fromEntries;

var su = { types:(O2(types.map((s) => [s, lodash[s]]))), to:(O2(to.map((s)=> [s, lodash[s]])))};
su.types.elements();
su.to.elements();

/* (50) isArguments,isArray,isArrayBuffer,isArrayLike,isArrayLikeObject,isBoolean,isBuffer
      , isDate,isElement,isEmpty,isEqual,isEqualWith,isError,isFinite,isFunction,isInteger
      , isLength,isMap,isMatch,isMatchWith,isNaN,isNative,isNil,isNull,isNumber,isObject
      , isObjectLike,isPlainObject,isRegExp,isSafeInteger,isSet,isString,isSymbol,isTypedArray
      , isUndefined,isWeakMap,isWeakSet
      , toArray,toFinite,toInteger,toLength,toLower,toNumber
      , toPairs,toPairsIn,toPath,toPlainObject,toSafeInteger,toString,toUpper 
*/
module.exports = { ...su.types, ...su.to }
module.exports.elements();

if(require.main)
  process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);

/* 
var {isString} = su.types;
var bo = isString('A');
*/