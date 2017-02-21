// bustabitbot.js - Written by @currentsea
// version 1.0-beta */
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
var maxpercentloss = 0.5; // 0.1 = 10%, 0.5 = 50%, etc, set this to the lowest point where the script will cut off at (0.5 = script cuts off at 50% of account)
var betpercentage = 0.015; // will use 1.5% of bankroll minimum for each game 
var myusername = 'beebo' // put your username here 
var breakpoints = [ 311, 211, 161, 121, 171, 373, 573, 161, 111, 101, 141, 166, 222, 111, 101, 102, 103, 104, 107, 108, 109, 110, 116, 118, 119, 131, 111, 118, 148, 168, 179, 321, 141, 163, 1666, 1777, 1888, 121, 121, 163, 163, 166, 177, 182, 132, 165, 203, 103, 123, 123, 112, 111, 105, 106, 107, 1111, 111111, 106, 108, 105, 662, 1234, 234, 622, 234, 106, 106, 283, 223, 116, 116, 776, 223, 116, 117, 118, 181, 191, 175, 171, 161, 166, 171, 181, 121, 111, 111, 111, 111, 166, 161, 171, 421, 127, 177, 199, 191, 181, 127, 137, 178, 272, 108, 118, 172, 872, 323, 178, 166, 165, 115, 105]
/** END USER CONFIG **/ 

/** BEGIN VARIABLES **/ 
var startingbalance = engine.getBalance() / 100; // do not touch 
var exitpoint = startingbalance - (startingbalance * maxpercentloss);  // do not touch 
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
	console.log('Preparing game'); 
	console.log(data); 
	console.log('current bet: ' + curbet); 

	randomten = Math.floor((Math.random() * breakpoints.length) + 1);
	var targetmultiplier = breakpoints[randomten]; 
	console.log(targetmultiplier + ' is target multipiler'); 
	if(numconseclosses > 3 && targetmultiplier < 200) { 
		curbet = curbet * 3; 
	} else if (numconsecreds > 8) { 
		curbet = curbet * 3
		targetmultiplier = targetmultiplier * 1.3
		if (targetmultiplier > 400) { 
			targetmultiplier = 400; 
		} 
	} 
	console.log('RANDOM TEN: ' + randomten); 
	engine.placeBet(Math.round(curbet).toFixed(0)*100, targetmultiplier, false); 


} 
// 10018200 / 42805400
function play_game_now(data) { 
	console.log('playing game now'); 
	curgamedata = get_game_data(data); 
	console.log(curgamedata); 
} 

function process_player_cashout(data) { 
	console.log(userlist[data.username].bet); 
	tablecashedout = tablecashedout + ((data.stopped_at / 100) * userlist[data.username].bet); 


	var curpayout = engine.getCurrentPayout(); 


	if (randomten == 7 && curpayout > 120 && tablecashedout < table_total) { 
		console.log('cashing out!'); 
		engine.cashOut(cashout_cb); 
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
		var profitmade = winningpayout - curbet; 
		moneywon = moneywon + profitmade; 
		console.log('winningpayout: ' + winningpayout); 
		console.log('total payout: ' + profitmade); 
		console.log(myusername + ' stopped at: ' + mylastcrash); 
	} 

	// console.log(data); 
} 

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
	console.log('---'); 
	console.log('games elapsed: ' + gameselapsed); 
	console.log('games played: ' + gamesplayed); 
	console.log('games won: ' + gameswon); 
	console.log('games lost: ' + gameslost); 
	console.log('money won: ' + moneywon); 
	console.log('money lost: ' + moneylost); 
	console.log('total wagered: ' + totalwagered); 
	console.log('--'); 
	console.log('total table wager: ' + table_total); 
	console.log('total table wager below 1.2: ' + wageredbelow120); 
	console.log('std dev of crash history: ' + stddev(crashhistory)); 
	console.log('std dev of multipliers cashed out below 120: ' + stddev(multipliersbelow120)); 

	onefifthwagerratio = cashedoutbelow120 / wageredbelow120; 
	console.log(onefifthwagerratio + "%"); 
	console.log('profit taken below 1.2: ' + cashedoutbelow120); 
	medianbelow120 = median(multipliersbelow120); 
	console.log('median multiplier below 120: ' + medianbelow120); 
	console.log('--'); 
	if ((engine.getBalance() / 100) <= exitpoint) { 
		console.log('exit point threshold reached, stoppping script via failsafe'); 
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


