// bustabitbot.js - Written by @currentsea
// version 2.2-beta */
// MIT License

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
var maxpercentloss = 0.3; // 0.1 = 10%, 0.5 = 50%, etc, set this to the lowest point where the script will cut off at (0.5 = script cuts off at 50% of account)
var betpercentage = 0.02; // will use 2% of bankroll minimum for each game 
var myusername = 'beebo' // put your username here 
var maxlosers = 10;  // maximum # of losing games before quitting
var breakpoints = [164, 136, 127, 132, 176, 171, 129, 192, 177, 153, 168, 155, 145, 107, 158, 186, 131, 120, 158, 114, 147, 175, 132, 121, 128, 155, 149, 137, 143, 175, 165, 161, 165, 188, 136, 149, 105, 108, 109, 177, 177, 183, 183, 233, 162, 123, 166, 123, 123, 122,  185, 104, 104, 183, 107, 180, 143, 115, 125, 141, 164, 156, 132, 129, 299, 272, 227, 292, 223, 226, 252, 297, 264, 260, 218, 284, 239, 204, 261, 245, 275, 255, 273, 211, 256, 224, 219, 277, 271, 296, 206, 269, 238, 251, 239, 243, 240, 173, 298, 249, 125, 136, 131, 296, 128, 129, 292, 249, 159, 206, 242, 132, 296, 125, 253, 233, 289, 182, 124, 161, 167, 289, 286, 182, 268, 165, 190, 112, 231, 264, 257, 167, 246, 285, 227, 178, 138, 253, 146, 187, 119, 150, 206, 254, 1623, 161, 176, 183, 176, 186, 223, 333, 717]/** END USER CONFIG **/ 

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

		console.log('Preparing game'); 
		console.log(data); 
		console.log('current bet: ' + curbet); 

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



		console.log('RANDOM TEN: ' + randomten); 
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
		console.log(targetmultiplier + ' is target multipiler'); 

		if ((curbet) > exitpoint) {
			if (randomten < 3) { 
				curbet = beginningbet; 
				console.log('set curbet back to beginning bet'); 
			} else { 
				curbet = exitopint * 1.3; 
			}
			
		}
		if (curbet)
		var mycurbalance = Math.round(engine.getBalance()).toFixed(0)*100; 
		console.log('balance before placing bet: ' + mycurbalance); 
		if (mycurbalance - curbet <= exitpoint) {
			console.log('adjusting bet so that we dont lose more than ' + exitpoint); 
			curbet = beginningbet; 
			console.log('new bet: ' + beginningbet); 
		}
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
		exitpoint += profitmade * 0.05; 

		console.log('moved exitpoint from ' + lastexitpoint + ' to exitpoint (additional guranteed balance from original risk of ' + lastexitpoint - exitpoint); 
		mylastcrash = lastcrash; 

	} else if (crash_state == 'LOST') { 
		gameslost++; 
		numconseclosses++; 
		numconsecwins = 0; 
		numconsecskipped = 0; 
		moneylost = moneylost + curbet; 
		totalwagered = totalwagered + curbet; 
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


