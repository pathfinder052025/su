/*jslint node: true, for: true */
'use strict';

require('../dist/index.lists.cjs');
      
var {O1,O2} = {O1: Object.keys, O2: Object.fromEntries};
var fs      = require('fs')
var ansi    = require('ansi')
var cursor  = ansi(process.stdout);

class SignCollect {
    get convertFromHex() {
        return (hex) => {
            var hex = hex.toString(); //force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        }
    }
    get convertToHex() {
        return (str) => {
            var hex = '';
            for (var i = 0; i < str.length; i++)
                hex += '' + str.charCodeAt(i).toString(16);
            return hex;
        }
    }
    get signRead() {
        return (m = 0) => {
            var file = __filename;
            var buffer, data, fp, fstat, nn, nv, vb, vdata, wb;
            wb = ['code', 'symbols', 'other']
            if (fs.existsSync(file)) {
                fp = fs.openSync(file, 'r');
                fstat = fs.fstatSync(fp);
                buffer = Buffer.alloc(fstat.size);
                fs.readSync(fp, buffer);
                fs.closeSync(fp);
                data = buffer.toString();
                vdata = data.replace(/\r/g, ``).split(/\n/);
                vdata = vdata.filter((s) => s.length);
                vb = {}, nn = 0, nv = 0;
                vdata.map((s) => [
                    s.startsWith(`•`) ? nv++ : 0, vb[wb[nv]] = vb[wb[nv]] || [], , vb[wb[nv]].push(s), nn++
                ]);
                vb.symbols.shift();
                vdata = vb.symbols.map((s) => s.trim().replace(/\s+/g, ' ').split('|'));
                // vb.code = methods.beautify([...vb.code, ...vb.other].join('\r\n'));
                vb.symbols = vdata.map((v) => v.map((s) => s.trim())).map((w) => [w[2], w[1], w[0]]);
                vb.symboln = vdata.map((v) => v.map((s) => s.trim())).map((w) => [w[3].replace(/\s/g,'_'), w[2]]);
                cursor.symbols   = O2(vb.symboln);
                cursor.symbols._ = O1(O2(vb.symbols)).toString();
            }
        }
    };
    constructor() {
        this.signRead();
    }
}
var sgnc = new SignCollect();

module.exports = {symbols:cursor.symbols, convertFromHex:sgnc.convertFromHex, convertToHex:sgnc.convertToHex};
module.exports.elements();

if(require.main){
    process.cursor.relFileName(__filename, module.exports, require.main.filename == __filename);
}
/*
https://www.unicode.org/charts/nameslist/n_1F680.html
•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
\ud83c\udd4f|1F14F  |🅏 |squared wc|
\ud83c\udd8f|1F18F  |🆏 |negative squared wc|
\ud83c\udfd7|1F3D7  |🏗 |building construction|
\ud83c\udfe8|1F3E8  |🏨 |hotel|
\ud83c\udff1|1F3F1  |🏱 |white pennant|
\ud83d\udc6b|1F46B  |👫 |man and woman holding hands|
\ud83d\udc7d|1F47D  |👽 |extraterrestrial alien|
\ud83d\ude80|1F680  |🚀 |Rocket|
\ud83d\ude81|1F681  |🚁 |Helicopter|
\ud83d\ude82|1F682  |🚂 |Steam Locomotive|
\ud83d\ude82|1F682  |🚂 |steam locomotive|
\ud83d\ude83|1F683  |🚃 |Railway Car|
\ud83d\ude84|1F684  |🚄 |High-Speed Train|
\ud83d\ude85|1F685  |🚅 |High-Speed Train With Bullet Nose|
\ud83d\ude86|1F686  |🚆 |Train|
\ud83d\ude86|1F686  |🚆 |train|
\ud83d\ude87|1F687  |🚇 |Metro|
\ud83d\ude88|1F688  |🚈 |Light Rail|
\ud83d\ude89|1F689  |🚉 |Station|
\ud83d\ude8a|1F68A  |🚊 |Tram|
\ud83d\ude8b|1F68B  |🚋 |Tram Car|
\ud83d\ude8c|1F68C  |🚌 |Bus|
\ud83d\ude8d|1F68D  |🚍 |Oncoming Bus|
\ud83d\ude8e|1F68E  |🚎 |Trolleybus|
\ud83d\ude8f|1F68F  |🚏 |Bus Stop|
\ud83d\ude90|1F690  |🚐 |Minibus|
\ud83d\ude91|1F691  |🚑 |Ambulance|
\ud83d\ude92|1F692  |🚒 |Fire Engine|
\ud83d\ude92|1F692  |🚒 |fire engine|
\ud83d\ude93|1F693  |🚓 |Police Car|
\ud83d\ude94|1F694  |🚔 |Oncoming Police Car|
\ud83d\ude95|1F695  |🚕 |Taxi|
\ud83d\ude96|1F696  |🚖 |Oncoming Taxi|
\ud83d\ude97|1F697  |🚗 |Automobile|
\ud83d\ude98|1F698  |🚘 |Oncoming Automobile|
\ud83d\ude99|1F699  |🚙 |Recreational Vehicle|
\ud83d\ude9a|1F69A  |🚚 |Delivery Truck|
\ud83d\ude9b|1F69B  |🚛 |Articulated Lorry|
\ud83d\ude9c|1F69C  |🚜 |Tractor|
\ud83d\ude9d|1F69D  |🚝 |Monorail|
\ud83d\ude9e|1F69E  |🚞 |Mountain Railway|
\ud83d\ude9f|1F69F  |🚟 |Suspension Railway|
\ud83d\udea0|1F6A0  |🚠 |Mountain Cableway|
\ud83d\udea1|1F6A1  |🚡 |Aerial Tramway|
\ud83d\udea2|1F6A2  |🚢 |Ship|
\ud83d\udea2|1F6A2  |🚢 |ship|
\ud83d\udea3|1F6A3  |🚣 |Rowboat|
\ud83d\udea4|1F6A4  |🚤 |Speedboat|
\ud83d\udea4|1F6A4  |🚤 |speedboat|
\ud83d\udea5|1F6A5  |🚥 |Horizontal Traffic Light|
\ud83d\udea6|1F6A6  |🚦 |Vertical Traffic Light|
\ud83d\udea7|1F6A7  |🚧 |Construction Sign|
\ud83d\udea8|1F6A8  |🚨 |Police Cars Revolving Light|
\ud83d\udea9|1F6A9  |🚩 |Triangular Flag On Post|
\ud83d\udeaa|1F6AA  |🚪 |Door|
\ud83d\udeab|1F6AB  |🚫 |No Entry Sign|
\ud83d\udeab|1F6AB  |🚫 |no entry sign|
\ud83d\udeac|1F6AC  |🚬 |Smoking Symbol|
\ud83d\udead|1F6AD  |🚭 |No Smoking Symbol|
\ud83d\udeae|1F6AE  |🚮 |Put Litter In Its Place Symbol|
\ud83d\udeaf|1F6AF  |🚯 |Do Not Litter Symbol|
\ud83d\udeb0|1F6B0  |🚰 |Potable Water Symbol|
\ud83d\udeb1|1F6B1  |🚱 |Non-Potable Water Symbol|
\ud83d\udeb2|1F6B2  |🚲 |Bicycle|
\ud83d\udeb3|1F6B3  |🚳 |No Bicycles|
\ud83d\udeb4|1F6B4  |🚴 |Bicyclist|
\ud83d\udeb5|1F6B5  |🚵 |Mountain Bicyclist|
\ud83d\udeb6|1F6B6  |🚶 |Pedestrian|
\ud83d\udeb7|1F6B7  |🚷 |No Pedestrians|
\ud83d\udeb8|1F6B8  |🚸 |Children Crossing|
\ud83d\udeb9|1F6B9  |🚹 |Mens Symbol|
\ud83d\udeba|1F6BA  |🚺 |Womens Symbol|
\ud83d\udebb|1F6BB  |🚻 |Restroom|
\ud83d\udebc|1F6BC  |🚼 |Baby Symbol|
\ud83d\udebd|1F6BD  |🚽 |Toilet|
\ud83d\udebe|1F6BE  |🚾 |Water Closet|
\ud83d\udebf|1F6BF  |🚿 |Shower|
\ud83d\udec0|1F6C0  |🛀 |Bath|
\ud83d\udec1|1F6C1  |🛁 |Bathtub|
\ud83d\udec2|1F6C2  |🛂 |Passport Control|
\ud83d\udec3|1F6C3  |🛃 |Customs|
\ud83d\udec4|1F6C4  |🛄 |Baggage Claim|
\ud83d\udec5|1F6C5  |🛅 |Left Luggage|
\ud83d\udec8|1F6C8  |🛈 |Circled Information Source|
\ud83d\udecb|1F6CB  |🛋 |Couch And Lamp|
\ud83d\udecc|1F6CC  |🛌 |Sleeping Accommodation|
\ud83d\udecd|1F6CD  |🛍 |Shopping Bags|
\ud83d\udece|1F6CE  |🛎 |Bellhop Bell|
\ud83d\udecf|1F6CF  |🛏 |Bed|
\ud83d\uded0|1F6D0  |🛐 |Place Of Worship|
\ud83d\uded1|1F6D1  |🛑 |Octagonal Sign|
\ud83d\uded2|1F6D2  |🛒 |Shopping Trolley|
\ud83d\uded5|1F6D5  |🛕 |Hindu Temple|
\ud83d\uded6|1F6D6  |🛖 |Hut|
\ud83d\uded7|1F6D7  |🛗 |Elevator|
\ud83d\udedc|1F6DC  |🛜 |Wireless|
\ud83d\udedd|1F6DD  |🛝 |Playground Slide|
\ud83d\udede|1F6DE  |🛞 |Wheel|
\ud83d\udedf|1F6DF  |🛟 |Ring Buoy|
\ud83d\udee0|1F6E0  |🛠 |Hammer And Wrench|
\ud83d\udee1|1F6E1  |🛡 |Shield|
\ud83d\udee2|1F6E2  |🛢 |Oil Drum|
\ud83d\udee3|1F6E3  |🛣 |Motorway|
\ud83d\udee4|1F6E4  |🛤 |Railway Track|
\ud83d\udee5|1F6E5  |🛥 |Motor Boat|
\ud83d\udee5|1F6E5  |🛥 |motor boat|
\ud83d\udee6|1F6E6  |🛦 |Up-Pointing Military Airplane|
\ud83d\udee7|1F6E7  |🛧 |Up-Pointing Airplane|
\ud83d\udee8|1F6E8  |🛨 |Up-Pointing Small Airplane|
\ud83d\udee9|1F6E9  |🛩 |Small Airplane|
\ud83d\udeea|1F6EA  |🛪 |Northeast-Pointing Airplane|
\ud83d\udeeb|1F6EB  |🛫 |Airplane Departure|
\ud83d\udeec|1F6EC  |🛬 |Airplane Arriving|
\ud83d\udef0|1F6F0  |🛰 |Satellite|
\ud83d\udef1|1F6F1  |🛱 |Oncoming Fire Engine|
\ud83d\udef1|1F6F1  |🛱 |oncoming fire engine|
\ud83d\udef2|1F6F2  |🛲 |Diesel Locomotive|
\ud83d\udef2|1F6F2  |🛲 |diesel locomotive|
\ud83d\udef3|1F6F3  |🛳 |Passenger Ship|
\ud83d\udef3|1F6F3  |🛳 |passenger ship|
\ud83d\udef4|1F6F4  |🛴 |Scooter|
\ud83d\udef5|1F6F5  |🛵 |Motor Scooter|
\ud83d\udef6|1F6F6  |🛶 |Canoe|
\ud83d\udef7|1F6F7  |🛷 |Sled|
\ud83d\udef8|1F6F8  |🛸 |Flying Saucer|
\ud83d\udef9|1F6F9  |🛹 |Skateboard|
\ud83d\udefa|1F6FA  |🛺 |Auto Rickshaw|
\ud83d\udefb|1F6FB  |🛻 |Pickup Truck|
\ud83d\udefc|1F6FC  |🛼 |Roller Skate|
\u25cc\u20e0|20E0   |◌⃠ |combining enclosing circle backslash|
\u25cc\u20e0|20E0   |◌⃠ |combining enclosing circle backslash|
\u2139      |2139   |ℹ |information source|
\u25b3      |25B3   |△ |white up-pointing triangle|
\u2692      |2692   |⚒ |hammer and pick|
\u26a0      |26A0   |⚠ |warning sign|
\u26cf      |26CF   |⛏ |pick|
\u26d4      |26D4   |⛔ |no entry|
\u26db      |26DB   |⛛ |heavy white down-pointing triangle|
\u26df      |26DF   |⛟ |black truck|
\u26f3      |26F3   |⛳ |flag in hole|
\u26f4      |26F4   |⛴ |ferry|
\u26f5      |26F5   |⛵ |sailboat|
\u2708      |2708   |✈ |airplane|
\u2708      |2708   |✈ |airplane|
\u2bc3      |2BC3   |⯃ |horizontal black octagon|
•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
*/