var startingbalance = engine.getBalance() / 100; // do not touch 
var startingmultiplier = 333 // 3.33x is represented as 333 in bustabit, set this to your starting multipler 
var maxpercentloss = 0.1; // 0.1 = 10%, 0.5 = 50%, etc, set this to the lowest point where the script will cut off at (0.5 = script cuts off at 50% of account)
var betpercentage = 0.02; // will use 2% of bankroll minimum for each game 
var myusername = 'beebo' // put your username here 
var currentmultiplier = startingmultiplier; // do not touch 
var exitpoint = startingbalance * maxpercentloss;  // do not touch 
var gameselapsed = 0; //do not touch
var gamesplayed = 0; // do not touch 
var gameswon = 0; // do not touch 
var gameslost = 0; 
var gamesskipped = 0; 
var beginningbet = betpercentage * startingbalance; // do not touch 
var curbet = beginningbet; // do not touch 
var mylastcrash = -1; // do not touch 
var randomten = Math.floor((Math.random() * 10) + 1); // do not touch
var totalwagered = 0; // do not touch 
var moneywon = 0; // do not touch
var moneylost = 0; // do not touch
var highestbet = 0; // do not touch
var userlist = []; // do not touch
var gamedata = {}; // do not touch
var numconsecwins = 0; // do not touch
var numconsecskipped = 0; // do not touch
var numconseclosses = 0; 
var crash_state = engine.lastGamePlay(); // do not touch 


console.log('bustabitbot.js - written by @currentsea - https://keybase.io/currentsea'); 
console.log('version 0.1 - alpha testing'); 
console.log('starting balance: ' + startingbalance); 
console.log('setting exit point to a balance less than or equal to ' + exitpoint);
console.log('beginning bet: ' + beginningbet); 
console.log('beginning multiplier: ' + startingmultiplier); 

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
	console.log('current multiplier: ' + currentmultiplier); 

	randomten = Math.floor((Math.random() * 10) + 1);
	console.log('RANDOM TEN: ' + randomten); 
	engine.placeBet(Math.round(curbet).toFixed(0)*100, currentmultiplier, false); 


} 

function play_game_now(data) { 
	console.log('playing game now'); 
	var curgamedata = get_game_data(data); 
	console.log(curgamedata); 
} 

function process_player_cashout(data) { 

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
	console.log()
	crash_state = engine.lastGamePlay();
	console.log(crash_state); 
	gameselapsed++; 
	if (crash_state == 'WON') { 
		gameswon++; 
		numconsecwins++; 
		numconseclosses = 0; 
		numconsecskipped = 0; 
		totalwagered = totalwagered + curbet; 
	} else if (crash_state == 'LOST') { 
		gameslost++; 
		numconseclosses++; 
		numconsecwins = 0; 
		numconsecskipped = 0; 
		moneylost = moneylost + curbet; 
		totalwagered = totalwagered + curbet; 
	} else { 
		gamesskipped++; 
		numconsecwins = 0; 
		numconsecskipped = 0; 
	}
	console.log('games elapsed: ' + gameselapsed); 
	console.log('games played: ' + gamesplayed); 
	console.log('games won: ' + gameswon); 
	console.log('games lost: ' + gameslost); 
	console.log('money won: ' + moneywon); 
	console.log('money lost: ' + moneylost); 
	console.log('total wagered: ' + totalwagered); 

} 
/* END GAME FUNCTIONS */ 

/* HELPER FUNCTIONS */ 

function get_game_data(data)  { 
	var returndata = {}; 
	var table_total = 0; 
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
		gamedata[user] = data[user]
		userlist.push(user); 
		arr.push(data[user].bet); 
		count++; 
	}
	var avgbet = table_total/count;
	var medianbet = median(arr);
	returndata.medianbet = medianbet; 
	returndata.avgbet=avgbet; 
	returndata.table_total = table_total; 
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


/* END HELPER FUNCTIONS */ 


