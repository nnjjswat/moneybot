// MoneyBot 3.0 - moneybot3.js
// Authors: Joe 'currentsea' Bull & Martin Markowski 
// https://github.com/currentsea/moneybot 

/* BEGIN LICENSE */ 
// Copyright (c) 2017 Joseph 'currentsea' Bull

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
/* END LICENSE */ 

var startingbet = 0; 
var betincrement = 1.065; 
var takeprofitpoint = 1899; 
var takeprofitincrementinterval = 0.9999; 
var playgamecriteria = 1866; 
var gamewaitcount = 3; 
var moneybot = 0; 
var medianupper = 1.96; 
var maxwinninggames = 33; 
var maxlosinggames = 33; 
var resetlosscountonwin = false; 
var winningstreakbetincrement = 1; 
var abortwhenmedianfails = 0; // =0 to only abort failed streaks with maxlosingstreakcutoff counter, set to =1 to abort failed streaks when data model median > medianupperlimit as configured in the line above
var abortonfailedentrycriteria = 0; // =0 to only abort failed streaks with maxlosingstreakcutoff counter, set to =1 to abort failed streaks when entrycriteria > last bust as configured above
var botpriority = 1;    // =1 to be first priority bot, =2 second priority bot, =3 third priority bot strategy to execute a bet when running on same account

var gamehistory = {}; 
var gameresults = []; 
var median = 197; 
console.log('starting median: ' + median); 

var grosswinnings = 0; 
var grosslosses = 0; 

var numwinners = 0; 
var numlosers = 0; 
var netprofits = 0; 
var winrate = 0; 
var totalprofit = 0; 
var paperbetting = 0; 
var moneybotlength = 0; 
var moneybotconfirmations = 0;

var gameselapsed = 0; 

var verbose = false; 

/** BEGIN ENGINE INSTRUCTIONS */ 
engine.on('game_starting', start_game); 

engine.on('game_started', play_game); 

engine.on('game_crash', finish_game); 

engine.on('cashed_out', cashout); 
/** END ENGINE INSTRUCTIONS */ 


/** BEGIN ENGINE LOGIC */ 
function start_game(gamedata) { 
    log_pre_game_data(gamedata); 
    calculate_net_profits(); 
    console.log("game # " + gameselapsed + " is starting..."); 
    calculate_win_rate(); 
    summarize(); 
}

function cashout(gamedata) { 
    log_cashout_data(gamedata); 
} 

function play_game(gamedata) { 
    console.log("we are now playing the game"); 
}

function finish_game(gamedata) { 
    console.log("game finished"); 
    gameselapsed++; 
} 
/** END ENGINE LOGIC */ 

/** HELPERS */ 
function median(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    var median = 0; 
    if (values.length % 2 == 0) { 
        median = values[half];
    }
    else { 
        var numerator = (values[half-1] + values[half]); 
        median =  numerator / 2.0;
    }
    return median; 
}

function finish_game(gamedata) { 
    console.log("Game is finished"); 
    log_post_game_data(gamedata); 
    gameselapsed = gameselapsed + 1; 
}

function log_pre_game_data(gamedata) { 

    console.log('--------------------------------------------'); 
    console.log('Game is starting - JSON shown below'); 
    console.log(JSON.stringify(gamedata)); 
} 

function log_post_game_data(gamedata) { 
    console.log('--------------------------------------------'); 
    console.log('Game is starting - JSON shown below'); 
    console.log(JSON.stringify(gamedata)); 
} 

function log_cashout_data(gamedata) { 
    if (verbose) {
        console.log('--------------------------------------------'); 
        console.log('Player cashed out - JSON shown below'); 
        console.log(JSON.stringify(gamedata)); 
    }
} 

function calculate_win_rate() { 
    console.log('calculating win rate'); 
    if (numwinners > 0 && numlosers > 0) {
        var modifier =  numwinners / numlosers; 
        winrate = modifier*100;
    }
    if (numwinners > 0 && numlosers == 0){
        winrate = 100;
    }
    console.log("win rate is currently " + winrate); 
    return winrate; 
} 

function calculate_net_profits() { 
    console.log("calculating net profits..."); 
    profits_have_changed = grosswinnings > 0 && grosslosses > 0; 
    var netchange = 0; 
    if (profits_have_changed == true){
        var oldnet = netprofits; 
        netprofits = ((grosswinnings / grosslosses ) * 100);
        netchange = oldnet - netprofits; 
        console.log("net profits have changed by " + netchange + " to " + netprofits); 
    } else { 
        console.log('net profits have not changed'); 
    }
    return netprofits; 
}

function summarize() { 
    console.log('============================================'); 
    console.log('==> Starting game... '); 
    console.log('==> Gross Winnings: ' + grosswinnings); 
    console.log('==> Gross Losses: ' + grosslosses); 
    console.log('==> Gain/Loss of ' + totalprofit); 
    console.log('==> # of games won: ' + numwinners); 
    console.log('==> # of games lost: ' + numlosers); 
    console.log('==> % of games won: ' + winrate + numlosers); 
    console.log('==> # of games elapsed: ' + gameselapsed); 
}



