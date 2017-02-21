var startingbalance = engine.getBalance() / 1000; // do not touch 
var startingmultiplier = 333 // 3.33x is represented as 333 in bustabit, set this to your starting multipler 
var maxpercentloss = 0.5; // 0.1 = 10%, 0.5 = 50%, etc, set this to the lowest point where the script will cut off at (0.5 = script cuts off at 50% of account)
var betpercentage = 0.02 // will use 2% of bankroll minimum for each game 


var currentmultiplier = startingmultiplier; // do not touch 
var exitpoint = startingbalance * maxpercentloss;  // do not touch 
var gameselapsed = 0; //do not touch
var gamesplayed = 0; // do not touch 
var gameswon = 0; // do not touch 
var beginningbet = betpercentage * startingbalance; // do not touch 
var curbet = beginningbet; // do not touch 


console.log('bustabitbot.js - written by @currentsea - https://keybase.io/currentsea'); 
console.log('version 0.1 - alpha testing'); 
console.log('starting balance: ' + startingbalance); 
console.log('setting exit point to a balance less than or equal to ' + exitpoint);
console.log('beginning bet: ' + beginningbet); 
console.log('beginning multiplier: ' + startingmultiplier); 
// console.log('minimum bet percentage: ' + betpercentage * 100 + '% of account');  

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
	engine.placeBet(Math.round(curbet).toFixed(0)*100, currentmultiplier, false); 
} 

function play_game_now(data) { 
	console.log('playing game now'); 
	console.log('data'); 

} 

function process_player_cashout(data) { 
	console.log('cash outs now'); 
	console.log(data); 
} 

function process_game_crash(data) { 
	console.log('game over'); 
	console.log(data); 
} 
/* END GAME FUNCTIONS */ 

/* HELPER FUNCTIONS */ 
/* END HELPER FUNCTIONS */ 


