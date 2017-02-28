// bustabitbot.js - Written by @currentsea
// version 2.2-beta */
// MIT License


/************ hey!!!! *****************/ 
// Do you want more scripts like this? 

// DONATIONS: 1AVoq4UTbJS42cUq85WN7yRQHoxHtxKA7m

// DONATIONS: 1AVoq4UTbJS42cUq85WN7yRQHoxHtxKA7m

// DONATIONS: 1AVoq4UTbJS42cUq85WN7yRQHoxHtxKA7m 

// Support continued development by sending your donations to BTC address 1AVoq4UTbJS42cUq85WN7yRQHoxHtxKA7m
/**************READ ABOVE******************/ 

// Copyright (c) 2017 Joe Bull

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


/** BEGIN USER CONFIG **/ 

var starting = engine.getBalance() / 100; 
console.log('starting balance: ' + starting); 
var maxpercentloss = 0.7; // 0.1 = 10%, 0.5 = 50%, etc, set this to the lowest point where the script will cut off at (0.5 = script cuts off at 50% of account)
var betpercentage = 0.012755; // will use 2% of bankroll minimum for each game 
var myusername = 'beebo' // put your username here 
var maxlosers = 190;  // maximum # of losing games before quitting
var maxbetamount = 787; // max bet to ever place 
var breakpoints = [164, 136, 127, 132, 176, 283, 214, 252, 270, 203, 276, 281, 275, 286, 271, 239, 237, 244, 221, 217, 216, 289, 282, 228, 281, 241, 235, 255, 244, 258, 238, 219, 217, 276, 225, 278, 251, 246, 210, 266, 226, 200, 280, 229, 200, 208, 239, 210, 217, 272, 220, 209, 271, 233, 256, 296, 296, 261, 257, 214, 280, 298, 296, 273, 244, 270, 239, 232, 259, 299, 279, 200, 213, 270, 285, 284, 221, 224, 276, 231, 225, 230, 244, 278, 277, 244, 223, 215, 214, 278, 212, 225, 211, 210, 299, 288, 211, 210, 294, 257, 274, 220, 206, 220, 600, 303, 679, 506, 644, 314, 549, 626, 651, 465, 649, 635, 692, 623, 565, 490, 483, 339, 443, 430, 583, 543, 428, 593, 470, 339, 398, 383, 496, 341, 554, 430, 635, 461, 411, 589, 602, 595, 672, 591, 531, 534, 361, 311, 654, 452, 560, 396, 574, 523, 412, 326, 533, 654, 437, 531, 384, 421, 432, 623, 240, 171, 129, 192, 177, 153, 168, 155, 145, 107, 158, 186, 188, 126, 107, 131, 124, 145, 178, 192, 107, 155, 130, 148, 180, 182, 182, 105, 198, 119, 177, 155, 120, 181, 169, 100, 124, 100, 125, 188, 132, 113, 167, 179, 141, 131, 170, 198, 137, 198, 159, 131, 137, 149, 187, 102, 140, 139, 132, 200, 131, 122, 152, 194, 199, 189, 124, 181, 155, 127, 175, 135, 125, 196, 173, 168, 146, 125, 112, 101, 110, 104, 194, 174, 143, 119, 162, 180, 166, 117, 144, 113, 161, 132, 163, 154, 888,3333,44444,666,222,333,444,1443, 796, 1213, 1211, 890, 779, 1635, 1441, 1052, 1609, 943, 1386, 1291, 961, 1420, 1429, 1020, 1274, 736, 1454, 1594, 855, 948, 1229, 1134, 1844, 1608, 1890, 1348, 875,222,333,444,333,222,333,444,2223,333,333,333,444,444,444,444,444, 160, 152, 187, 148, 194, 165, 100, 127, 173, 187, 146, 149, 192, 169, 151, 177, 142, 173, 194, 115, 152, 188, 102, 178, 182, 123, 149, 196, 106, 156, 119, 1452, 1767, 1211, 1268, 1230, 1462, 1042, 1097, 1858, 1256, 1099, 1684, 1169, 1155, 834, 1527, 1272, 1446, 848, 1614, 1768, 1611, 1410, 1414, 972, 1873, 787, 1670, 1651, 1102, 15399, 118669, 206, 16756, 170584, 235, 11762, 25471, 130, 9944, 114551, 105, 9152, 188295, 152, 12219, 150673, 144, 7914, 56366, 126, 8440, 180568, 251, 13199, 182352, 178, 4745, 109331, 256, 116, 158, 135, 171, 187, 170, 169, 167, 139, 138, 142, 137, 161, 122, 108, 123, 167, 133, 171, 125, 194, 112, 126, 105, 135, 141, 162, 182, 122, 115, 120, 112, 180, 115, 139, 129, 137, 133, 105, 154, 105, 155, 106, 155, 185, 144, 128, 191, 177, 152, 143, 194, 142, 159, 163, 159, 165, 130, 107, 145, 152, 128, 114, 147, 163, 145, 148, 161, 148, 188, 186, 131, 180, 132, 165, 158, 189, 183, 194, 147, 144, 105, 193, 146, 186, 280, 234, 299, 252, 267, 219, 313, 238, 164, 233, 120, 216, 247, 305, 174, 137, 161, 150, 209, 211, 133, 179, 169, 167, 284, 204, 184, 139, 141, 141, 252, 149, 206, 192, 269, 235, 153, 321, 168, 315, 169, 192, 240, 329, 145, 231, 200, 207, 196, 320, 155, 238, 160, 247, 267, 297, 328, 167, 239, 170, 224, 300, 147, 262, 167, 265, 304, 136, 234, 292, 268, 124, 321, 321, 294, 296, 292, 170, 262, 293, 215, 279, 142, 242, 148, 142, 270, 257, 317, 123, 177, 309, 241, 156, 120, 170, 124, 304, 180, 174, 142, 110, 181, 148, 151, 182, 146, 166, 183, 142, 196, 196, 149, 107, 112, 119, 183, 178, 191, 102, 192, 124, 138, 133, 125, 160, 189, 190, 181, 192, 125, 158, 139, 127, 103, 137, 145, 123, 100, 148, 102, 197, 127, 162, 143, 196, 185, 140, 149, 158, 104, 164, 175, 150, 192, 144, 107, 129, 157, 198, 105, 111, 172, 149, 190, 139, 143, 176, 134, 123, 123, 192, 147, 195, 191, 174, 167, 110, 181, 200, 160, 153, 171, 166, 111, 148, 126, 177, 164, 104, 133, 187, 111, 139, 149, 169, 122, 109, 126, 163, 179, 152, 116, 194, 185, 141, 187, 194, 192, 145, 142, 130, 109, 157, 113, 162, 105, 191, 128, 123, 132, 185, 135, 177, 143, 119, 163, 148, 179, 181, 179, 163, 113, 192, 164, 169, 154, 127, 182, 127, 146, 105, 182, 150, 177, 196, 130, 130, 193, 120, 171, 102, 101, 130, 198, 147, 135, 166, 144, 127, 152, 200, 184, 199, 102, 116, 139, 163, 105, 159, 119, 108, 103, 111, 127, 157, 125, 129, 138, 104, 178, 122, 159, 174, 168, 164, 155, 129, 184, 139, 103, 180, 185, 167, 167, 123, 167, 101, 136, 119, 160, 126, 133, 138, 129, 195, 117, 141, 196, 116, 152, 146, 122, 126, 153, 173, 105, 174, 135, 140, 140, 114, 134, 169, 184, 115, 120, 160, 156, 114, 100, 120, 154, 196, 163, 120, 132, 163, 192, 116, 108, 199, 170, 183, 121, 186, 168, 150, 156, 188, 198, 114, 153, 130, 177, 187, 191, 133, 122, 102, 121, 171, 169, 111, 108, 122, 135, 198, 157, 128, 112, 156, 115, 103, 159, 147, 183, 181, 152, 169, 160, 128, 180, 186, 164, 186, 179, 139, 101, 120, 176, 162, 196, 121, 152, 156, 130, 160, 165, 100, 22222, 2222, 2222, 6626, 3333, 131, 120, 158, 114, 147, 175, 132, 121, 128, 155, 149, 137, 143, 175, 165, 161, 165, 188, 136, 149, 105, 108, 109, 177, 177, 183, 183, 233, 162, 123, 166, 123, 123, 122,  185, 104, 104, 183, 107, 180, 143, 115, 125, 141, 164, 156, 132, 129, 299, 272, 227, 292, 223, 226, 252, 297, 264, 260, 218, 241, 166, 181, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 123, 838, 939, 828, 828, 1234, 1616, 9829, 202, 2020, 505, 202, 5085, 603, 102, 106, 126, 6561, 162, 167, 177, 177, 188, 191, 195, 195, 193, 193, 191, 1771, 171, 171,161, 133, 141, 161, 284, 239, 204, 261, 245, 275, 255, 273, 211, 256, 224, 219, 277, 271, 296, 206, 269, 238, 251, 239, 243, 240, 173, 298, 249, 125, 136, 131, 296, 128, 129, 292, 249, 159, 206, 242, 132, 296, 125, 253, 233, 289, 182, 124, 161, 167, 289, 286, 182, 268, 165, 190, 112, 231, 264, 257, 167, 246, 285, 227, 178, 138, 253, 146, 187, 119, 150, 206, 254, 1623, 161, 176, 183, 176, 186, 223, 333, 717, 167, 134, 127, 159, 125, 156, 139, 153, 141, 172, 168, 166, 139, 127, 149, 152, 139, 146, 134, 133, 148, 158, 160, 171, 148, 162, 159, 145, 127, 131, 127, 126, 154, 158, 150, 165, 130, 158, 150, 132, 127, 136, 151, 133, 165, 144, 147, 160, 149, 133, 170, 141, 173, 135, 130, 155, 133, 151, 126, 174, 146, 143, 172, 134, 172, 155, 157, 134, 150, 167, 162, 131, 141, 139, 170, 139, 159, 128, 147, 174, 161, 169, 164, 172, 156, 162, 142, 161, 161, 149, 155, 158, 161, 167, 164, 166, 134, 174, 136, 134, 133, 141, 159, 166, 146, 157, 172, 151, 134, 151, 126, 131, 168, 158, 147, 136, 151, 174, 149, 171, 159, 174, 156, 130, 156, 170, 162, 171, 126, 154, 170, 172, 144, 142, 147, 137, 144, 175, 131, 162, 160, 157, 149, 170, 125, 136, 136, 165, 151, 136, 151, 131, 172, 170, 145, 170, 148, 170, 152, 141, 139, 131, 146, 127, 153, 125, 154, 173, 162, 157, 156, 167, 163, 133, 173, 128, 134, 164, 172, 158, 148, 141, 127, 169, 153, 157, 169, 163, 154, 171, 171, 136, 175, 133, 144, 137, 148, 156, 128, 164, 144, 170, 165, 154, 137, 139, 156, 173, 138, 150, 145, 129, 172, 130, 141, 173, 131, 159, 172, 171, 128, 168, 173, 159, 174, 161, 157, 163, 160, 134, 149, 145, 147, 131, 144, 127, 173, 137, 168, 125, 145, 173, 145, 166, 131, 133, 153, 143, 150, 131, 151, 162, 165, 131, 172, 152, 138, 167, 161, 129, 175, 148, 148, 129, 151, 146, 165, 128, 167, 148, 160, 140, 169, 130, 167, 135, 174, 147, 150, 173, 154, 157, 130, 156, 170, 132, 139, 132, 149, 157, 172, 164, 127, 152, 139, 157, 154, 143, 153, 150, 153, 125, 155, 152, 167, 140, 166, 127, 158, 160, 130, 136, 146, 166, 148, 173, 149, 156, 138, 139, 156, 146, 167, 137, 171, 133, 165, 157, 161, 173, 163, 162, 152, 166, 144, 133, 174, 135, 133, 134, 149, 133, 151, 127, 141, 135, 138, 136, 133, 149, 130, 152, 161, 166, 149, 125, 143, 162, 160, 173, 161, 174, 168, 163, 147, 157, 169, 164, 130, 126, 158, 165, 166, 173, 158, 132, 160, 154, 144, 137, 174, 154, 138, 125, 139, 167, 145, 164, 139, 130, 172, 156, 168, 166, 166, 152, 137, 161, 148, 141, 131, 167, 152, 154, 173, 175, 142, 151, 158, 148, 129, 136, 158, 172, 147, 136, 135, 175, 165, 165, 129, 141, 156, 145, 133, 173, 148, 145, 163, 129, 154, 143, 147, 149, 151, 140, 142, 173, 174, 174, 135, 162, 133, 125, 173, 133, 146, 145, 162, 125, 175, 135, 157, 158, 144, 134, 129, 164, 140, 170, 148, 172, 126, 132, 156, 145, 151, 128, 161, 128, 164, 152, 172, 135, 170, 145, 151, 134, 161, 152, 140, 171, 151, 165, 149, 140, 174, 149, 159, 144, 160, 171, 175, 174, 153, 133, 171, 172, 157, 135, 135, 158, 170, 128, 128, 135, 173, 140, 128, 133, 126, 143, 166, 156, 160, 163, 133, 175, 131, 158, 130, 150, 155, 147, 152, 150, 127, 129, 139, 167, 172, 125, 158, 151, 130, 135, 158, 165, 168, 155, 144, 143, 170, 161, 163, 162, 128, 131, 156, 166, 167, 133, 131, 158, 174, 147, 166, 169, 156, 171, 138, 148, 169, 141, 153, 156, 164, 168, 141, 166, 141, 160, 154, 158, 128, 166, 156, 158, 167, 138, 162, 133, 148, 150, 130, 161, 173, 168, 161, 157, 133, 144, 145, 128, 169, 156, 162, 169, 150, 154, 165, 138, 156, 172, 132, 156, 133, 162, 164, 129, 152, 136, 145, 168, 168, 143, 173, 134, 146, 175, 125, 125, 133, 134, 125, 174, 138, 147, 155, 165, 143, 153, 142, 129, 174, 151, 138, 138, 142, 133, 158, 143, 169, 131, 170, 133, 152, 138, 132, 148, 165, 159, 174, 172, 161, 174, 129, 170, 170, 156, 174, 134, 133, 162, 174, 152, 144, 143, 164, 154, 151, 166, 140, 162, 163, 125, 148, 174, 144, 161, 149, 161, 173, 172, 129, 166, 159, 152, 150, 157, 169, 142, 131, 158, 159, 160, 154, 149, 171, 148, 137, 175, 140, 126, 126, 171, 171, 126, 157, 149, 153, 131, 126, 139, 128, 174, 130, 164, 136, 133, 152, 133, 160, 168, 153, 161, 171, 156, 135, 132, 172, 160, 166, 152, 136, 127, 172, 141, 159, 150, 166, 173, 152, 148, 131, 137, 158, 126, 134, 148, 173, 155, 131, 160, 130, 135, 141, 135, 144, 135, 173, 125, 161, 152, 170, 162, 164, 168, 158, 171, 167, 152, 141, 157, 126, 155, 166, 151, 140, 129, 137, 142, 171, 168, 151, 162, 144, 171, 154, 138, 156, 150, 127, 137, 137, 149, 162, 148, 146, 131, 172, 162, 158, 129, 169, 127, 168, 165, 141, 133, 165, 129, 155, 170, 138, 138, 158, 158, 136, 125, 170, 163, 133, 157, 167, 134, 133, 145, 166, 170, 158, 145, 134, 143, 151, 157, 134, 174, 169, 133, 175, 149, 175, 135, 168, 130, 167, 135, 167, 169, 172, 142, 165, 144, 163, 135, 164, 169, 149, 165, 139, 152, 144, 129, 142, 128, 131, 135, 127, 157, 133, 143, 171, 140, 144, 129, 142, 150, 174, 158, 156, 148, 160, 158, 158, 155, 127, 129, 164, 147, 150, 173, 130, 171, 146, 161, 167, 135, 125, 157, 167, 166, 125, 138, 127, 126, 125, 168, 127, 137, 149, 128, 164, 165, 160, 127, 134, 165, 154, 136, 159, 174, 155, 125, 162, 164, 167, 156, 142, 130, 151, 126, 168, 139, 148, 152, 136, 160, 163, 159, 143, 172, 149, 144, 143, 148, 159, 170, 131, 160, 166, 132, 147, 133, 139, 136, 153, 161, 170, 159, 151, 160, 148, 129, 163, 145, 135, 159, 173, 134, 161, 134, 143, 172, 127, 138, 126, 132, 168, 149, 164, 135, 169, 149, 131, 167, 144, 156, 173, 154, 151, 135, 125, 149, 130, 131, 172, 174, 161, 141, 10000, 1000, 2000, 3000]/** END USER CONFIG **/ 

/** BEGIN VARIABLES **/ 
var startingbalance = engine.getBalance() / 100; // do not touch 
var exitpoint = startingbalance - (startingbalance * maxpercentloss);  // do not touch 
var currentlyplaying = false; 
var profitmade = 0; // do not touch 
var gameselapsed = 0; //do not touch
var gamesplayed = 0; // do not touch 
var gameswon = 0; // do not touch 
var gameslost = 0; // do not touch 
var gamesskipped = 0; // do not touch 
var beginningbet = betpercentage * startingbalance; // do not touch 
var curbet = beginningbet; // do not touch 
var lastcrash = 0; // do not touch 
var below148consec = 0; 
var mylastcrash = -1; // do not touch 
var randomten = Math.floor((Math.random() * 10) + 1); // do not touch
var totalwagered = 0; // do not touch 
var moneywon = 0; // do not touch
var moneylost = 0; // do not touch
var highestbet = 0; // do not touch
var userlist = {};  // do not touch
var gamedata = {}; // do not touch
var numconsecwins = 0; // do not touch
var numconsecskipped = 0; // do not touch
var numconseclosses = 0; // do not touch
var numconsecreds = 0; // do not touch
var numconsecgreens = 0; // do not touch
var greengames = []; // do not touch
var paddedprofit = 0; // do not touch
var redgames = []; // do not touch
var crash_state = engine.lastGamePlay(); // do not touch 
var lastbonus = 0; // do not touch
var curtabletotal = 0; // do not touch
var tablecashedout = 0; // do not touch
var curgamedata = {};  // do not touch
var wageredbelow120 = 0;  // do not touch
var cashedoutbelow120 = 0; // do not touch
var medialmultiplierbelow120 = 0; // do not touch 
var numplayerscashedoutbelow120 = 0; // do not touch 
var sumofcashedoutmultipliersbelow120 = 0;  // do not touch
var crashhistory = []; // do not touch 
var multipliersbelow120 = []; // do not touch 
var medianbelow120 = 0; // do not touch 
var onefifthwagerratio = 0; // do not touch 
var table_total = 0; // do not touch 
var cur_random = Math.floor((Math.random() * 100) + 1); // do not touch
var sitoutcount = 0; 
var emergencycashouts = 0; 
var sitoutthree = false; 
var usesmallmultiplierforbiggain = false; 
var originalexitpoint = exitpoint; 
/** END VARIABLES VARIABLES **/ 

console.log('bustabitbot.js - written by @currentsea - https://keybase.io/currentsea'); 
console.log('version 2.1 - beta testing'); 
console.log('starting balance: ' + startingbalance); 
console.log('setting exit point to a balance less than or equal to ' + exitpoint);
console.log('beginning bet: ' + beginningbet); 
/* ENGINE DECLARAITONS - DO NOT MODIFY */ 
engine.on('game_starting', prepare_game); 

engine.on('game_crash', process_game_crash); 

engine.on('game_started', play_game_now); 

engine.on('cashed_out', process_player_cashout)
/* END ENGINE DECLARATIONS */ 


/* GAME FUNCTIONS */ 
function prepare_game(data) { 

	if (sitoutthree == false) { 

		cur_random = Math.floor((Math.random() * 100) + 1);
		if (cur_random % 13 == 0) { 
			console.log('Sitting out 3 games in a row starting the game after this one'); 
			sitoutthree = true; 
			sitoutcount = 0; 
		}

		if (numconsecgreens > 8) { 
			sitoutthree = true; 
		} 

		randomten = Math.floor((Math.random() * breakpoints.length) + 1);
		var targetmultiplier = breakpoints[randomten]; 
		if(numconseclosses > 3 && targetmultiplier < 200) { 
			curbet = curbet * 1.013; 
		} else if (numconsecreds > 8) { 
			curbet = curbet * 1.025
			targetmultiplier = targetmultiplier * 1.03
			if (targetmultiplier > 400) { 
				targetmultiplier = 400; 
			} 
		} 

		var avghist = average(crashhistory); 
		var avgmed = median(crashhistory); 

		if (avgmed > targetmultiplier && gameselapsed > 10 && numconsecreds > 3) { 
			targetmultiplier = targetmultiplier * 2; 
		} 

		if (avgmed % 2 ==0) { 
			curbet = curbet * 0.998; 
		} else { 
			curbet = curbet * 1.1; 
		} 
		

		if (targetmultiplier == undefined) { 
			randomten = Math.floor((Math.random() * breakpoints.length) + 1);

			targetmultiplier = breakpoints[randomten]; 
		} 

		if ((curbet) > exitpoint) {
			if (randomten < 3) { 
				curbet = beginningbet; 
				console.log('set curbet back to beginning bet'); 
			} else { 
				curbet = exitpoint * 1.3; 
			}
			
		}

		if (curbet > maxbetamount) { 
			curbet = beginningbet; 
		} 

		if (usesmallmultiplierforbiggain == true) { 
			targetmultiplier = 125; 
			curbet = curbet * 5; 
		}
		var mycurbalance = Math.round(engine.getBalance()).toFixed(0)*100; 
		console.log('balance before placing bet: ' + mycurbalance); 
		if (mycurbalance - curbet <= exitpoint) {
			console.log('adjusting bet so that we dont lose more than ' + exitpoint); 
			curbet = beginningbet; 
			console.log('new bet: ' + beginningbet); 
		}


		console.log(curbet + ' is current bet'); 
		if (below148consec >= 12) { 
			curbet = curbet * 10; 
			targetmultiplier = 148; 
			console.log('ENDING THE SHIT STREAK.'); 
		} 
		console.log(targetmultiplier + ' is target multipiler'); 
		engine.placeBet(Math.round(curbet).toFixed(0)*100, targetmultiplier, false); 
	} else { 
		console.log('sitting this one out (' + sitoutcount + ' out of 3)');
		sitoutcount++;
		if (sitoutcount >= 3) { 
			sitoutthree = false; 
			sitoutcount = 0; 
			console.log('playing the next round after sitting out'); 
		}

	} 
}
// 10018200 / 42805400
function play_game_now(data) { 
	console.log('playing game now'); 
	curgamedata = get_game_data(data); 
	console.log(curgamedata); 
} 

function process_player_cashout(data) { 
		// console.log(userlist[data.username].bet); 
		tablecashedout = tablecashedout + ((data.stopped_at / 100) * userlist[data.username].bet); 
		var cashoutanyway = Math.floor((Math.random() * 1000) + 1); 


		if ((sumofcashedoutmultipliersbelow120 * 0.6) > curtabletotal && cashoutanyway > 900) { 	
			engine.cashOut(cashout_cb); 
			emergencycashouts++; 
			console.log('another emergency cashout'); 
		}

		if (cashoutanyway % 4 == 0 && currentlyplaying == true) { 
				engine.cashOut(cashout_cb); 
				emergencycashouts++; 
				console.log('emergency cashout');			
		} 

		var curpayout = engine.getCurrentPayout(); 


		if (randomten == 7 && curpayout > 120 && tablecashedout < table_total) { 
			console.log('cashing out!'); 
			engine.cashOut(cashout_cb); 
			if (currentlyplaying == true) { 
				emergencycashouts++; 
			}

		} 

		if (curpayout < 120 && data.stopped_at > 100) { 
			wageredbelow120 = wageredbelow120 +  userlist[data.username].bet; 
			cashedoutbelow120 = cashedoutbelow120 + (userlist[data.username].bet * (data.stopped_at / 100)); 
			numplayerscashedoutbelow120 = numplayerscashedoutbelow120 + 1; 
			sumofcashedoutmultipliersbelow120 += data.stopped_at; 
			multipliersbelow120.push(data.stopped_at); 
		}
		if (data.username == myusername) { 
			console.log('cash out detected: ' + data.username); 
			mylastcrash = data.stopped_at; 
			var crashdecimal = mylastcrash / 100; 
			console.log(data); 
			console.log(myusername + ' cash out'); 
			console.log(myusername + ' bet: ' + curbet); 
			var winningpayout = curbet * crashdecimal; 
			profitmade = winningpayout - curbet; 
			moneywon = moneywon + profitmade; 
			console.log('winningpayout: ' + winningpayout); 
			console.log('total payout: ' + profitmade); 
			if (currentlyplaying == true) { 
				emergencycashouts++; 
			}
			console.log(myusername + ' stopped at: ' + mylastcrash); 
		} 

} 
	
	// console.log(data); 


function process_game_crash(data) { 
	console.log('game over'); 
	console.log(data); 
	crash_state = engine.lastGamePlay();
	console.log(crash_state); 
	lastcrash = data.game_crash; 
	crashhistory.push(lastcrash); 
	var gamesummary = {}
	gamesummary['tablebet'] = curtabletotal; 
	gamesummary['cashedout'] = tablecashedout; 
	gamesummary['numplayers'] = curgamedata.length; 
	gamesummary['avgbet'] = curgamedata.avgbet; 
	gamesummary['medianbet'] = curgamedata.medianbet; 
	gamesummary['overallprofitloss'] = curtabletotal - tablecashedout; 
	if ((curtabletotal - tablecashedout) > 0) { 
		gamesummary['housemademoney'] = true; 
	} else { 
		gamesummary['houselostmoney'] = false; 
	} 

	if (lastcrash < 148) { 
		below148consec++; 
	} else { 
		below148consec = 0; 
	} 

	if (lastcrash <= 197) { 
		redgames.push(gamesummary); 
		numconsecreds++; 
		numconsecgreens = 0; 
	} else { 
		greengames.push(gamesummary); 
		numconsecgreens++; 
		numconsecreds = 0; 
	} 
	console.log('game crash: ' + lastcrash); 
	gameselapsed++; 
	if (crash_state == 'WON') { 
		gameswon++; 
		numconsecwins++; 
		numconseclosses = 0; 
		numconsecskipped = 0; 
		moneywon = moneywon + lastbonus; 
		console.log('last bonus: ' + lastbonus); 
		lastbonus = 0; 
		totalwagered = totalwagered + curbet; 
		console.log('consecutive wins: ' + numconsecwins); 
		var lastexitpoint = exitpoint; 
		exitpoint = exitpoint + (profitmade * 0.05); 
		// var newexitpoint = lastexitpoint - exitpoint; 
		var profitof = exitpoint - originalexitpoint; 
		console.log('moved exitpoint from ' + lastexitpoint + ' to exitpoint (additional guranteed balance from original risk of ' + originalexitpoint + ' to ' + exitpoint + ' (profit of ' + profitof + ')'); 
		mylastcrash = lastcrash; 
		if (usesmallmultiplierforbiggain == true) { 
			usesmallmultiplierforbiggain = false; 
			curbet = beginningbet; 
			console.log('reverting to initialbet as we used a small multiplier for a bigger gain successfully'); 
		} 

	} else if (crash_state == 'LOST') { 
		gameslost++; 
		numconseclosses++; 
		numconsecwins = 0; 
		numconsecskipped = 0; 
		moneylost = moneylost + curbet; 
		totalwagered = totalwagered + curbet; 
		if (cur_random % 2 == 0) { 
			curbet = curbet * 1.1; 
		} else { 
			curbet = curbet * 0.9; 
		}

		if (curbet < (beginningbet * 0.8)) {
			curbet = beginningbet; 
		}

		if (usesmallmultiplierforbiggain == true) { 
			curbet = curbet * 2; 
		} 
		
		console.log('consecutive losses: ' + numconseclosses); 
		mylastcrash = lastcrash; 
	} else { 
		gamesskipped++; 
		numconsecwins = 0; 
		numconsecskipped = 0; 
		console.log('consecutive games skipped: ' + numconsecskipped); 
	}
	profitmade = 0; 
	console.log('---'); 
	console.log('games elapsed: ' + gameselapsed); 
	console.log('games played: ' + gamesplayed); 
	console.log('games won: ' + gameswon); 
	console.log('emergency cashouts: ' + emergencycashouts); 
	console.log('games lost: ' + gameslost); 
	console.log('money won: '  + moneywon); 
	console.log('money lost: ' + moneylost); 
	console.log('total wagered: ' + totalwagered); 
	console.log('--'); 
	console.log('total table wager: ' + table_total); 
	console.log('total table wager below 1.2: ' + wageredbelow120); 
	// console.log('std dev of crash history: ' + stddev(crashhistory)); 
	// console.log('std dev of multipliers cashed out below 120: ' + stddev(multipliersbelow120)); 

	onefifthwagerratio = cashedoutbelow120 / wageredbelow120; 
	console.log(' ONE FIFTH WAGER RATIO from last game: ' + onefifthwagerratio + "%"); 
	console.log('profit taken below 1.2: ' + cashedoutbelow120); 
	medianbelow120 = median(multipliersbelow120); 
	console.log('median multiplier below 120: ' + medianbelow120); 
	console.log('--'); 
	if ((engine.getBalance() / 100) <= exitpoint) { 
		console.log('exit point threshold reached, stoppping script via failsafe'); 
		engine.stop(); 
	} 

	if (gameslost >= maxlosers) { 
		console.log('Max losers of ' + maxlosers + ' reached. Stopping the script.'); 
		engine.stop(); 
	} 

	tablecashedout = 0; 
	wageredbelow120 = 0; 
	cashedoutbelow120 = 0; 
	numplayerscashedoutbelow120 = 0; 
	sumofcashedoutmultipliersbelow120 = 0; 
	userlist = []; 

	if (numconsecreds > 4 && numconseclosses > 3 && cur_random % 2 ==0) { 
		usesmallmultiplierforbiggain = true; 

	} 

} 

function cashout_cb(data) { 
	console.log('Cashed out!'); 
	console.log(data); 
}
/* END GAME FUNCTIONS */ 

/* HELPER FUNCTIONS */ 

function get_game_data(data)  { 
	var returndata = {}; 
	table_total = 0; 
	var arr = [];
	console.log('in game data'); 
	var count = 0; 
	console.log(data); 
	for (var user in data) {
		table_total += data[user].bet;
		if (data[user].bet > highestbet) { 
			highestbet = data[user].bet; 
		} 
		var the_user = engine.getUsername(user); 
		gamedata[user] = data[user]; 
		userlist[user] = data[user]; 
		if (user == 'beebo' && data[user].bonus > 0) { 
			lastbonus = data[user].bonus; 
		}
		arr.push(data[user].bet); 
		count++; 
	}
	var avgbet = table_total/count;
	var medianbet = median(arr);
	returndata.medianbet = medianbet; 
	returndata.avgbet=avgbet; 
	returndata.table_total = table_total; 
	curtabletotal = table_total; 
	returndata.num_players = arr.length; 
	returndata.game_data = gamedata; 
	console.log(medianbet); 
	console.log('BETS CUMULATIVE TOTAL FOR THIS ROUND: ' + table_total); 
	console.log('NUMBER OF PLAYERS: ' + arr.length); 
	console.log('AVERAGE BET: ' + avgbet); 
	console.log('MEDIAN BET: ' + medianbet); 
	return returndata; 


} 
	
function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

function stddev(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}


/* END HELPER FUNCTIONS */ 


