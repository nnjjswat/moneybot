
console.log('Written by @currentsea'); 
console.log('STARTING CURRENTSEA v1.3'); 
var numgameselapsed = 0;  
var numgamesnotplayed = 0; 
var numgamesplayed = 0; 
var numgameswon = 0; 
var numconsecwins = 0; 
var tablecurrentwager = 0.0;
var numconecwins = 0;  
var totalcashedout = 0; 
var numplayerscurrentlyinthisgame = 0; 
var numgameslost = 0; 
var gamesplayed = 0; 
var numgreenswon = 0; 
var numgreenslost = 0; 
var maxlosers = 10; 
var numredslost = 0; 
var lastcurbal = 0; 
var numredsskipped = 0; 
var highestbet = 0; 
var numconsecreds = 0; 
var multiplier = 0; 
var totalmoneylost = 0; 
var numredswon = 0; 
var maxgames = 250; 
var lastcashoutmultiplier = 0; 
var cumcrash = 1; 
var numgreensskipped = 0; 
var avgbustscore = 0; 
var sitoutthree = false; 
var gamesundersevenconsecutively = 0; 
var rollingaverage = 0;
var actualprofit = 0; 
var bustcumulativetotal = 0;  
var totalmoneywon = 0; 
var modifiedorigbetamount = 333; 
var maxmoneythatcanbelost = 150000; 
var gameselapsed = 0; 
var lastcrash = 0; 
var ignore_randomized_bullshit = true; 
var paperprofit = 0; 
var numskipped = 0; 
var gamedata = {}; 
var initialbetamount = 333;
var originalbetamount = initialbetamount; 
var tpi = 200; 
var starting_balance = engine.getBalance(); 
console.log('YOUR STARTING BALANCE IS ' + starting_balance); 
var num_bits = starting_balance / 100;
var cashed_out = false; 
console.log(num_bits); 
var playing = false; 
var cur_random = Math.floor((Math.random() * 100) + 1);
var sitoutcount = 0; 

var numconseclosses=0; 

var targetgetout = 0; 

var randomized = Math.floor((Math.random() * 100) + 1);
console.log('random'); 
console.log(randomized); 
var last_state = engine.lastGamePlay();

engine.on('game_starting', play_game); 

engine.on('game_crash', process_crash); 

engine.on('game_started', play_game_now); 

engine.on('cashed_out', process_player_cashout)

function process_player_cashout(data) { 
	// console.log(data) 
	// console.log('PLAYER CASHOUT'); 
	cur_random = Math.floor((Math.random() * 100) + 2);
	var curpayout = engine.getCurrentPayout(); 
	sleep(3);

	var initialbet = initialbetamount; 
	if (cashed_out == true ) { 

	} else if (cur_random % 6 == 0 || ignore_randomized_bullshit == false && curpayout < 1.05) { 
		curpayout = engine.getCurrentPayout(); 
		var dblpayout = curpayout * 2; 
		if (numconseclosses > 2 && dblpayout > lastcashoutmultiplier && lastcrash < 155) { 
			engine.cashOut(cocallback); 
			cashed_out=true; 
			console.log('consecutive losses save your ass cashout'); 
		}

		curpayout = engine.getCurrentPayout(); 
		if (data.username == 'beebo' && gamedata.game_data[data.username].stopped_at != undefined) { 
			lastcashoutmultiplier = gamedata.game_data['beebo'].stopped_at; 
			console.log('SET LAST CASHOUT MULTIPLIER -- ' + lastcashoutmultiplier); 
		}

		if (curpayout * initialbet > gamedata.medianbet * 3.14) { 
			cashed_out=true; 
			if (playing == true) { 
					actualprofit = actualprofit + (curpayout * initialbet); 
					lastcashoutmultiplier = curpayout; 

			}

			engine.cashOut(cocallback); 
			console.log('Cashed out from median times pi :-)'); 
		}
		if (cur_random == 13 && gamedata.medianbet % 17 == 0) { 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
				lastcashoutmultiplier = curpayout; 

			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log (' joe bull cashout special '); 

		}

		if (cur_random % 2 == 1 && curpayout % 10 == 0) { 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log (' joe bull cashout special '); 
		}
		if (curpayout > 178 && cur_random % 3 == 0) { 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
				lastcashoutmultiplier = curpayout; 
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log('cash out at 6 times bet payout'); 
		}

		if (numplayerscurrentlyinthisgame < 3) { 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
				lastcashoutmultiplier = curpayout; 
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log('less than 3 players in game -- cashed out'); 
		}

		totalcashedout += (gamedata.game_data[data.username].bet * gamedata.game_data[data.username].stopped_at) / 100; 
		if (cur_random >= 94) { 
			cashouttarget = gamedata.table_total; 
		} else if (cur_random > 77 && cur_random < 94) { 
			cashouttarget = gamedata.table_total * 1.12
		} else if (cur_random >= 60 && cur_random <= 77) { 
			cashouttarget = gamedata.table_total * 0.6723; 
		} else if (cur_random > 50 && cur_random < 60) { 
			cashouttarget = gamedata.table_total * 0.7; 
		} else if (cur_random >=35 && cur_random <= 50) { 
			cashouttarget = gamedata.table_total * 1.2; 
		} else { 
			cashouttarget = gamedata.table_total * 1.1; 
		}

		if (last_state == 'LOST' && cur_random % 3 == 0) { 
			cashouttarget = cashouttarget * 0.8; 
		} 


		if (numconsecreds > 6) { 
			cashouttarget = cashouttarget * 3; 
		} 

		cashouttarget = cashouttarget * engine.getCurrentPayout() + (highestbet * 0.77); 

		if (playing == true && cashed_out == false) { 
			console.log('CASH OUT TARGET FOR THIS ITERATION: ' + cashouttarget); 
			console.log('CASHED OUT FOR THIS ITERATION: ' + totalcashedout); 
		}

		if (totalcashedout > cashouttarget) { 
			curpayout = engine.getCurrentPayout(); 
			if (curpayout < 1.4 && numconseclosses > 3 && numconsecreds > 2) { 
			} else { 
				engine.cashOut(cocallback); 
				if (playing == true) { 
					console.log('Cashing out because totalcashedout >  cashouttarget for this iteration: PAYOUT: ' + curpayout); 
					actualprofit = actualprofit + (curpayout * initialbet);  
					lastcashoutmultiplier = curpayout; 
				} else { 
					paperprofit = paperprofit + curpayout; 
				}
				
				cashed_out=true; 
			}
		}
		tablecurrentwager = tablecurrentwager - data.amount; 
		numplayerscurrentlyinthisgame = numplayerscurrentlyinthisgame - 1; 

		if (tablecurrentwager % 14 == 0 && numplayerscurrentlyinthisgame < 10) { 
			engine.cashOut(cocallback); 
			cashed_out=true; 
			console.log('Cashed out from random number 13 as thats how many players are left')
		}
		randomized_random = Math.floor((Math.random() * 100) + 1); 
		cur_random = cur_random + 1
		other_random = Math.floor((Math.random() * 100) + 1);
		if (other_random+1 - cur_random + 1 == 7 && randomized_random == cur_random) { 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
				lastcashoutmultiplier = curpayout; 
			}
			engine.cashOut(cocallback); 
			console.log('Cashed out from random number ' + cur_random)
			cashed_out=true; 
		}
	} else { 
		if (playing == true) { 
			console.log  ('Ignoring randoized bullshit... '); 
		}

		cur_random = Math.floor((Math.random() * 100) + 2);
		var temp_random =  Math.floor((Math.random() * 100) + 2);
		if (cur_random % 13 == 0 && temp_random > 77 && numconsecreds < 4 && engine.getCurrentPayout() > 1.4) { 
			console.log  ('Cashing out anyway'); 
			if (playing == true) { 
				actualprofit = actualprofit + (curpayout * initialbet); 
				lastcashoutmultiplier = curpayout; 
			}
			engine.cashOut(cocallback); 
			console.log('Cashed out from random number ' + cur_random)
			cashed_out=true; 
		}
	}
}

function cocallback(data) { 
	console.log('Cashed out!'); 
	console.log(data); 

}

function play_game_now(data) { 
	cashed_out = false; 
	console.log('-- BEGINNING GAME PLAY --'); 
	gamedata = get_game_data(data); 
	console.log(gamedata.game_data); 
	firstwavegamedata = gamedata; 
	console.log('STARTING # OF PLAYERS: ' + firstwavegamedata.num_players); 
	console.log('STARTING TABLE WAGER: ' + firstwavegamedata.table_total); 
	tablecurrentwager = firstwavegamedata.table_total; 
	numplayerscurrentlyinthisgame = firstwavegamedata.num_players; 
	targetgetout = numplayerscurrentlyinthisgame - (randomized * 1.14)
	if (targetgetout < 0) { 
		targetgetout = targetgetout * -1; 
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function get_game_data(data) { 
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


function play_game(info) { 
	console.log(info); 
	if (sitoutthree == true) { 
		sitoutcount = sitoutcount + 1;
		console.log ('sat out game #' + sitoutcount + ' of 3');  
		if (sitoutcount == 3) { 
			sitoutthree = false; 
		}
	} else { 
		console.log('NUMBER CONSECUTIVE REDS: ' + numconsecreds); 
		console.log('LAST CASHOUT MULTIPLIER -- ' + lastcashoutmultiplier + " (" + numconseclosses + " consecutive losses)"); 

		game_data = {}; 
		var avgbuster = bustcumulativetotal / gamesplayed;
		if (totalmoneylost >= maxmoneythatcanbelost) { 
			console.log('GAME STOPPED! - we have lost the most we are allowed to lose'); 
			console.log('AVERAGE BUST SINCE START: ' + avgbuster); 
			engine.stop(); 
		}

		if (numgameslost >= maxlosers) { 
			console.log('max losers reached, stopping'); 
			engine.stop(); 
		}
	



		if (initialbetamount > 2300) {
			if (last_state == 'WON') { 
				if (randomized % 4 == 0) { 
					initialbetamount = originalbetamount * 1.03;
					modifiedorigbetamount = initialbetamount;  
				}
			} else if (last_state == 'LOST') { 
				if (lastcrash < 110) { 
					initialbetamount = originalbetamount * 1.08; 
				} else { 
					if (randomized % 5 == 0) { 
						initialbetamount = modifiedorigbetamount * 1.01;  
					} else { 
						initialbetamount = originalbetamount; 
					}				
				}
			} else { 


			}
		 	
		} 

		var tehbal = engine.getBalance()

		lastcurbal = tehbal;
		if (tehbal < 2313420) { 
			console.log('failsafe'); 
			engine.stop(); 
		}

		if ((initialbetamount > originalbetamount * 2.7) && tehbal < 5) { 
			initialbetamount = originalbetamount * 1.4; 
		}
		if (initialbetamount > 2800 && tehbal >= 5 && cur_random % 2 ==0) { 
			initialbetamount = initialbetamount * 1.2; 
		}

		if (numconsecreds > 3 && last_state == 'WON') { 
			initialbetamount = initialbetamount * 1.1; 
			numconseclosses = 0; 
		} 
		if (numconsecreds > 3 && last_state == 'LOST') { 
			initialbetamount = initialbetamount * 1.26; 
		} 

		if (numconseclosses > 2 && numconsecreds > 10) { 
			initialbetamount = initialbetamount * 3
		} 

		if (numconsecwins > 9) { 
			initialbetamount = initialbetamount * 1.33; 
		}

		// } else { 
		// }
		// if (randomized < 7 && lastcrash < 132) {
		// 	var ourtargetbet = initialbetamount * 3.14; 
		// 	if (ourtargetbet > engine.getBalance()) { 
		// 		ourtargetbet = engine.getBalance() * 0.2; 
		// 	}
		// 	console.log('going for it!'); 
		// } else if (randomized == 33) { 
		// 	engine.placeBet(Math.round(3000).toFixed(0)*100, 314, false); 
		// } 
		// else if (randomized > 88) { 
		// 	engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 175, false); 
		// } else if (lastcrash < 111 ){ 
		// 	engine.placeBet(Math.round(1788 * 2).toFixed(0)*100, 155, false); 
		// } else { 
		// 	engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 777, false); 
		// }
		cur_random = Math.floor((Math.random() * 100) + 1);

		if (cur_random % 13 == 0) { 
			console.log('Sitting out 3 games in a row starting the game after this one'); 
			sitoutthree = true; 
			sitoutcount = 0; 
		} 


		if (gameselapsed > 20 && numconseclosses > 1 && numconsecreds > 1 && avgbuster  < 150) { 
			var curbal = engine.getBalance() * 2; 
			curbal = curbal * 0.2; 
			// engine.placeBet(Math.round(curbal).toFixed(0)*100, 215, false); 

		}

		if (initialbetamount == undefined) { 
			initialbetamount = initialbetamount * 1.25; 
			modifiedorigbetamount = initialbetamount; 
		}
		playing = true; 
		if (cur_random % 6 == 0) { 
			console.log('skippy mc dippy'); 
			playing = false; 
		} else if (cur_random % 6 == 0) { 
			console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 176)'); 
			initialbetamount = initialbetamount * 1.2; 
			// engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 211, false); 
		} else if (cur_random % 8 == 0) { 
			console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 414)'); 

			var thebet = initialbetamount * 1.2; 
			if (thebet > 7000) { 
				thebet = originalbetamount * 1.2; 
			} 


		} else { 
			if (numconsecreds > 7) { 

				if (initialbet * 2.3 > 7000) { 
					initialbetamount = originalbetamount; 
				} 
				if (numconsecreds > 4 && numredswon > numredslost) { 
					// engine.placeBet(Math.round(initialbetamount * 2).toFixed(0)*100, 272, false); 
					// console.log('PLACING BET FOR ' + initialbetamount * 1.23 + ' (TP: 314)'); 
				} else { 
					var bet = initialbetamount * 1.02; 
					initialbetamount = bet; 
					// engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 737, false); 
				}
				
			} else { 
				// engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 363, false); 
				console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 314)'); 
			}
			

		}

		if (initialbetamount > 5000) { 
			initialbetamount = originalbetamount * 1.06; 
		} 
		if (cur_random == 1) { 
			multiplier = 10000; 
		} 
		else if (cur_random > 1 && cur_random <= 3) { 
			multiplier = 1955; 
		} 
		else if (cur_random > 3 && cur_random < 10) { 
			multiplier = 555; 
		} else if (cur_random >= 10 && cur_random < 20) { 
			multiplier = 314; 
		} else if (cur_random >= 20 && cur_random < 50) { 
			multiplier = 214; 
		} else if (cur_random >= 50 && cur_random < 75) { 
			multiplier = 177; 
		} else { 
			multiplier = 155; 
		} 
		multiplier = Math.floor(Math.floor((Math.random() * 777) + 100) * 0.5);
		if (multiplier < 100) { 
			multiplier = multiplier + 100; 
		} 
		console.log('using multiplier ' + multiplier); 



		engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, multiplier, false); 


		if (cur_random % 2 ==0) { 
			ignore_randomized_bullshit = true; 
		} else  {
			ignore_randomized_bullshit = false; 
		}


		if (gamesplayed == 0) { 
			console.log('No games elapsed, we would bet 1000 bits for 2x.'); 
		}
	}


}; 

function process_crash(data) { 
	console.log(data); 
	var bal = engine.getBalance(); 
	console.log('BALANCE: ' + bal); 
	console.log('ELAPSED: ' + data.elapsed); 
	tablecurrentwager = 0; 
	totalcashedout = 0; 
	numplayerscurrentlyinthisgame = 0; 
	lastcrash = data.game_crash; 

	if (lastcrash < 777) { 
		gamesundersevenconsecutively++; 
	} else { 
		gamesundersevenconsecutively = 0; 
	}

	console.log('CRASH AT ' + lastcrash); 
	if (lastcrash < 197) { 
		numconsecreds++; 
	} else { 
		numconsecreds = 0; 
	}

	cashed_out = false; 
	var crash_state = engine.lastGamePlay();
	// rollingaverage.push(data.stopped_at); 
	bustcumulativetotal = bustcumulativetotal + data.game_crash; 
	gamesplayed++; 
	last_state = crash_state; 

	if (crash_state == 'WON') { 
		totalmoneywon = totalmoneywon + (engine.getBalance() - initialbetamount - lastcurbal); 
		numgameswon++; 
		numconseclosses = 0; 
		console.log ('WINNER WINNER CHICKEN DINNER'); 
		numconsecwins = numconsecwins + 1; 
		if (lastcrash < 197) { 
			numredswon++; 
		} else { 
			numgreenswon++; 
		}
	} 



	if (lastcrash < 105) { 
		initialbetamount = initialbetamount * 1.063;
	}



	// else if (randomized == 33) { 

	// }

	// else if (randomized < 22) { 
	// 	initialbetamount = 1000;
	// } else if (crash_state == 'WON') { 
	// 	if (randomized > 30 && randomized < 50) { 
	// 		initialbetamount = initialbetamount * 2;
	// 	} else { 
	// 		initialbetamount = initialbetamount + 730;
	// 	}
	// 	// if (initialbetamount > 600 && randomized % 3 == 0) {
	// 	// 	// if () { 

	// 	// 		initialbetamount = 1050;

	// 	// 	// }
	// 	// 	// else { 
	// 	// 	// 	initialbetamount = 2500;
	// 	// 	// }
	// 	// }

	// 	initialbetamount = modifiedorigbetamount; 
	// } 

	if (crash_state == 'LOST') { 
		numgameslost++; 
		numconseclosses = numconseclosses + 1; 	
		numconsecwins = 0; 

		if (lastcrash < 197) { 
			numredslost++;
		} else { 
			numgreenslost++; 
		}

		if (randomized > 55 && randomized < 78) { 
			totalmoneylost = totalmoneylost + initialbetamount; 
			initialbetamount = 1000;
			console.log ('LOSER LOSER ITS A DOOZER!');
			if (randomized % 3 == 0)  { 
				initialbetamount = initialbetamount * 1.011; 
			} else { 
				initialbetamount = modifiedorigbetamount * 1.023; 
			}

		} else { 
			if (randomized > 50) { 
				initialbetamount = initialbetamount * 1.2; 
				if (initialbetamount > engine.getBalance()) { 
					initialbetamount = engine.getBalance() * 0.25; 
					console.log('reduced bet amount to 25 percent of account amount'); 
				} 
			} else { 
				initialbetamount = modifiedorigbetamount * 0.99965; 
			}			
			if (initialbetamount <= 0) { 
				initialbetamount = originalbetamount * 0.986; 
			}
		}
	}

	if (crash_state == 'NOT_PLAYED') { 
		numskipped++; 
		if (lastcrash < 197) {
			if(numconsecreds > 3) { 
				initialbetamount = originalbetamount * 1.2; 
			}
			numredsskipped++; 
		} else { 
			numgreensskipped++; 
		}
	}

	cumcrash += lastcrash - 1; 
	avgbustscore = cumcrash / gamesplayed; 

	console.log(''); 
	console.log('--------- GAME FINISHED ---------');
	console.log('REDS SKIPPED: ' + numredsskipped); 
	console.log('REDS WON: ' + numredswon); 
	console.log('REDS LOST: ' + numredslost); 
	console.log('GREENS WON: ' + numgreenswon);
	console.log('GREENS LOST: ' + numgreenslost); 
	console.log('GREENS SKIPPED: ' + numgreensskipped); 
	console.log('AVERAGE BUST SCORE: ' + avgbustscore); 
	console.log('TOTAL MONEY WON: ' + totalmoneywon); 
	console.log('TOTAL MONEY LOST: ' + totalmoneylost); 
	gameselapsed = gamesplayed + numredsskipped + numgreensskipped; 
	console.log('GAMES ELAPSED: ' + gameselapsed); 
	console.log('GAMES PLAYED: ' + gamesplayed); 
	console.log('---------------------------------'); 

}; 


