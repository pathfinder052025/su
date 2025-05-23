/*jslint node: true, for: true */
'use strict';

var sp, st, su;
su = require('su');
sp = su.moduls.parts;
st = su.moduls.vars;

var {Concertino} = sp.wb.methods;

/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/

var op = {config:__filename.readSign()};
''.add(op, op.config.CONFIG.option);
''.add(op, op.config.CONFIG.vars);
op.banner = 'A';
new Concertino(op);

/*•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
$BOF
$CONFIG
  [publisher]
    author     = 'Kunath, Thomas Michael'
    create     = 'Mar-2025'
	version    = {major:1, release:0.01}
  [output]
    writer     = cursor.write
    debug      = false
  [option]
	banner     = 'DTEXT'
	isLocal    = true
	isLoop     = true
	once       = true
    stop       = 'callback'
	callback   = ()=>{}
    delay      = 15
	mode       = 'start'
	stopInSec  = 60
	restartSec = 3
	stopConc   = 5
	concStop   = false;
  [vars]
    br     = {x:1, y:  2, s:'banner'}
    cr     = {x:1, y: 15, s:'vehicle'}
	cursor = ''.cursor()
$URL
  https://patorjk.com/software/taag/#p=display&f=Big&t=Sudoku%0A
  https://www.unicode.org/charts/nameslist/n_2500.html
$ATEXT
  🚀
       ___          ___          ___          ___          ___          ___
      /\  \        /\__\        /\  \        /\  \        /\__\        /\__\
     /::\  \      /:/  /       /::\  \      /::\  \      /:/  /       /:/  /
    /:/\ \  \    /:/  /       /:/\:\  \    /:/\:\  \    /:/__/       /:/  /
   _\:\~\ \  \  /:/  /  ___  /:/  \:\__\  /:/  \:\  \  /::\__\____  /:/  /  ___
  /\ \:\ \ \__\/:/__/  /\__\/:/__/ \:|__|/:/__/ \:\__\/:/\:::::\__\/:/__/  /\__\
  \:\ \:\ \/__/\:\  \ /:/  /\:\  \ /:/  /\:\  \ /:/  /\/_|:|~~|~   \:\  \ /:/  /
   \:\ \:\__\   \:\  /:/  /  \:\  /:/  /  \:\  /:/  /    |:|  |     \:\  /:/  /
    \:\/:/  /    \:\/:/  /    \:\/:/  /    \:\/:/  /     |:|  |      \:\/:/  /
     \::/  /      \::/  /      \::/__/      \::/  /      |:|  |       \::/  /
      \/__/        \/__/        ~~           \/__/        \|__|        \/__/
$BTEXT
  ❤
   .oooooo..o                   .o8            oooo
  d8P'    `Y8                  *888            `888
  Y88bo.      oooo  oooo   .oooo888   .ooooo.   888  oooo  oooo  oooo
   `*Y8888o.  `888  `888  d88' `888  d88' `88b  888 .8P'   `888  `888
       `*Y88b  888   888  888   888  888   888  888888.     888   888
  oo     .d8P  888   888  888   888  888   888  888 `88b.   888   888
  8**88888P'   `V88V*V8P' `Y8bod88P* `Y8bod8P' o888o o888o  `V88V*V8P'
$CTEXT
  ⭐
    /$$$$$$                  /$$           /$$                
   /$$__  $$                | $$          | $$                
  | $$  \__/ /$$   /$$  /$$$$$$$  /$$$$$$ | $$   /$$ /$$   /$$
  |  $$$$$$ | $$  | $$ /$$__  $$ /$$__  $$| $$  /$$/| $$  | $$
   \____  $$| $$  | $$| $$  | $$| $$  \ $$| $$$$$$/ | $$  | $$
   /$$  \ $$| $$  | $$| $$  | $$| $$  | $$| $$_  $$ | $$  | $$
  |  $$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$/| $$ \  $$|  $$$$$$/
   \______/  \______/  \_______/ \______/ |__/  \__/ \______/ 
$ATEXT1
  😊
  ██████████████████████████████████████
  ██┏━━━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━┓██
  ██┃ A1 A2 A3 ┃ B1 B2 B3 ┃ C1 C2 C3 ┃██
  ██┃ A4 A5 A6 ┃ B4 B5 B6 ┃ C4 C5 C6 ┃██
  ██┃ A7 A8 A9 ┃ B7 B8 B9 ┃ C7 C8 C9 ┃██
  ██┠━━━━━━━━━━━━╋━━━━━━━━━━━━╋━━━━━━━━━━━━┨██
  ██┃ D1 D2 D3 ┃ E1 E2 E3 ┃ F1 F2 F3 ┃██
  ██┃ D4 D5 D6 ┃ E4 E5 E6 ┃ F4 F5 F6 ┃██
  ██┃ D7 D8 D9 ┃ E7 E8 E9 ┃ F7 F8 F9 ┃██
  ██┠━━━━━━━━━━━━╋━━━━━━━━━━━━╋━━━━━━━━━━━━┨██
  ██┃ G1 G2 G3 ┃ H1 H2 H3 ┃ I1 I2 I3 ┃██
  ██┃ G4 G5 G6 ┃ H4 H5 H6 ┃ I4 I5 I6 ┃██
  ██┃ G7 G8 G9 ┃ H7 H8 H9 ┃ I7 I8 I9 ┃██
  ██┗━━━━━━━━━━━━┻━━━━━━━━━━━━┻━━━━━━━━━━━━┛██
  ██████████████████████████████████████
$DTEXT
  😊
   .d8888b.                                              888    d8b                   
  d88P  Y88b                                             888    Y8P                   
  888    888                                             888                          
  888         .d88b.  88888b.  88888888  .d88b.  888d888 888888 888 88888b.   8888b.  
  888        d88""88b 888 "88b    d88P  d8P  Y8b 888P"   888    888 888 "88b     "88b 
  888    888 888  888 888  888   d88P   88888888 888     888    888 888  888 .d888888 
  Y88b  d88P Y88..88P 888  888  d88P    Y8b.     888     Y88b.  888 888  888 888  888 
   "Y8888P"   "Y88P"  888  888 88888888  "Y8888  888      "Y888 888 888  888 "Y888888 
$EOF
•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••*/