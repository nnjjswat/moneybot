
console.log('Written by @currentsea'); 
console.log('STARTING CURRENTSEA v0.1'); 
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
var maxlosers = 13; 
var numconsecreds = 0; 
var totalmoneylost = 0; 
var lastcashoutmultiplier = 0; 
var rollingaverage = 0;
var actualprofit = 0; 
var bustcumulativetotal = 0;  
var totalmoneywon = 0; 
var modifiedorigbetamount = originalbetamount; 
var maxmoneythatcanbelost = 15000; 
var lastcrash = 0; 
var paperprofit = 0; 
var numskipped = 0; 
var gamedata = {}; 
var initialbetamount = 1033;
var originalbetamount = initialbetamount; 
var tpi = 200; 
var starting_balance = engine.getBalance(); 
console.log('YOUR STARTING BALANCE IS ' + starting_balance); 
var num_bits = starting_balance / 100;
var cashed_out = false; 
console.log(num_bits); 
var playing = false; 
var cur_random = Math.floor((Math.random() * 100) + 1);


var numconseclosses=0; 

var targetgetout = 0; 

var randomized = Math.floor((Math.random() * 100) + 1);
console.log('random'); 
console.log(randomized); 
var last_state = engine.lastGamePlay();

// if (last_state == 'LOST') { 
// 	tpi=400; 
// }


engine.on('game_starting', play_game); 

engine.on('game_crash', process_crash); 

engine.on('game_started', play_game_now); 

engine.on('cashed_out', process_player_cashout)

function process_player_cashout(data) { 
	// console.log(data) 
	// console.log('PLAYER CASHOUT'); 
	cur_random = Math.floor((Math.random() * 100) + 2);

	if (cashed_out == true ) { 

	} else { 
		var curpayout = engine.getCurrentPayout(); 
		curpayout = engine.getCurrentPayout(); 
		if (data.username == 'beebo' && gamedata.game_data[data.username].stopped_at != undefined) { 
			lastcashoutmultiplier = gamedata.game_data['beebo'].stopped_at; 
			console.log('SET LAST CASHOUT MULTIPLIER -- ' + lastcashoutmultiplier); 
		}
		if (cur_random < 3 && numplayerscurrentlyinthisgame <= targetgetout * 3.14 && cashed_out == false) { 
			if (randomized < 20) { 
				targetgetout = numplayerscurrentlyinthisgame
			}

			if (playing == true) { 
				actualprofit = actualprofit + curpayout;

			}

			engine.cashOut(cocallback); 
			console.log('GTFO! ' + numplayerscurrentlyinthisgame  + ' <= ' + targetgetout); 
			cashed_out=true; 
		}
		if (curpayout > gamedata.medianbet * 3.14) { 
			cashed_out=true; 
			if (playing == true) { 
					actualprofit = actualprofit + curpayout;
			}

			engine.cashOut(cocallback); 
			console.log('Cashed out from median times pi :-)'); 
		}
		if (cur_random == 13 && gamedata.medianbet % 17 == 0) { 
			if (playing == true) { 
				actualprofit = actualprofit + curpayout;
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log (' joe bull cashout special '); 

		}

		if (cur_random % 2 == 1 && curpayout % 10 == 0) { 
			if (playing == true) { 
				actualprofit = actualprofit + curpayout;
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log (' joe bull cashout special '); 
		}
		if (curpayout > (initialbetamount * 6)) { 
			if (playing == true) { 
				actualprofit = actualprofit + curpayout;
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log('cash out at 6 times bet payout'); 
		}

		if (numplayerscurrentlyinthisgame < 3) { 
			if (playing == true) { 
				actualprofit = actualprofit + curpayout;
			}
			engine.cashOut(cocallback); 
			cashed_out = true; 
			console.log('less than 3 players in game -- cashed out'); 
		}

		totalcashedout += (gamedata.game_data[data.username].bet * gamedata.game_data[data.username].stopped_at) / 100; 
		if (cur_random >= 94) { 
			cashouttarget = gamedata.table_total; 
		} else if (cur_random > 77 && cur_random < 94) { 
			cashouttarget = gamedata.table_total * 1.62
		} else if (cur_random >= 60 && cur_random <= 77) { 
			cashouttarget = gamedata.table_total * 0.6723; 
		} else if (cur_random > 50 && cur_random < 60) { 
			cashouttarget = gamedata.table_total * 1.2; 
		} else if (cur_random >=35 && cur_random <= 50) { 
			cashouttarget = gamedata.table_total * 0.33; 
		} else { 
			cashouttarget = gamedata.table_total * 0.5; 
		}

		if (last_state == 'LOST' && cur_random % 3 == 0) { 
			cashouttarget = cashouttarget * 0.18; 
		} 
		console.log('CASH OUT TARGET FOR THIS ITERATION: ' + cashouttarget); 
		console.log('CASHED OUT FOR THIS ITERATION: ' + totalcashedout); 
		// halfcashedout = totalcashedout / 2
		if (totalcashedout > cashouttarget) { 
			curpayout = engine.getCurrentPayout(); 
			engine.cashOut(cocallback); 
			if (playing == true) { 
				console.log('Cashing out because totalcashedout >  cashouttarget for this iteration: PAYOUT: ' + curpayout); 
				actualprofit = actualprofit + curpayout; 
			} else { 
				paperprofit = paperprofit + curpayout; 
			}
			
			cashed_out=true; 
		}



		// if (randomized > 25) { 

		// }

		tablecurrentwager = tablecurrentwager - data.amount; 
		numplayerscurrentlyinthisgame = numplayerscurrentlyinthisgame - 1; 

		if (tablecurrentwager % 14 == 0 && numplayerscurrentlyinthisgame < 3) { 
			engine.cashOut(cocallback); 
			cashed_out=true; 
			console.log('Cashed out from random number 13 as thats how many players are left')
		}
		randomized_random = Math.floor((Math.random() * 100) + 1); 
		cur_random = cur_random + 1
		other_random = Math.floor((Math.random() * 100) + 1);
		if (other_random+1 - cur_random + 1 == 7 && randomized_random == cur_random) { 
			if (playing == true) { 
				actualprofit = actualprofit + curpayout;
			}
			engine.cashOut(cocallback); 
			console.log('Cashed out from random number ' + cur_random)
			cashed_out=true; 
		}
	}


	// console.log  ('TOTAL CASHED OUT: ' + tablecurrentwager); 
}

function cocallback(data) { 
	console.log('Cashed out!'); 
	console.log(data); 
}

function play_game_now(data) { 
	cashed_out = false; 
	console.log('-- BEGINNING GAME PLAY --'); 
	console.time("start_initial_calculations");
	gamedata = get_game_data(data); 
	console.log(gamedata.game_data); 
	firstwavegamedata = gamedata; 
	// console.log(firstwavegamedata); 
	console.log('STARTING # OF PLAYERS: ' + firstwavegamedata.num_players); 
	console.log('STARTING TABLE WAGER: ' + firstwavegamedata.table_total); 
	var initial_calcs = console.timeEnd('start_initial_calculations'); 
	// print ('INITIAL CALCS: ' + initial_calcs); 
	tablecurrentwager = firstwavegamedata.table_total; 
	numplayerscurrentlyinthisgame = firstwavegamedata.num_players; 

	// var randommod = Math.floor((Math.random(3) * 100) + 1);
//	var randy = randommod

	targetgetout = numplayerscurrentlyinthisgame - (randomized * 1.14)
	if (targetgetout < 0) { 
		targetgetout = targetgetout * -1; 
	}
	// console.time("start_2nd_calculations");
	// sleep(3000); 
	// firstwavegamedata = get_game_data(data); 
	// tablecurrentwager = firstwavegamedata.table_total; 
	// numplayerscurrentlyinthisgame = firstwavegamedata.num_players; 
	// curamount = tablecurrentwager - totalcashedout; 
	// console.log('AFTER 3 seconds -- table wager: ' + curamount); 
	// console.log('AFTER 3 seconds -- players left: ' + numplayerscurrentlyinthisgame); 
	// var initial_calcs = console.timeEnd('start_2nd_calculations'); 
	// console.log()
	// secondwavegamedata = get_game_data(data); 
	// console.log(secondwavegamedata); 
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

	// if (randomized == 33) { 
	// 	engine.placeBet(1500000, 200, false);
	// }
	// else if (randomized < 10) { 
	// 	engine.placeBet(500000, 200, false);
	// } else if (randomized >= 20 && randomized <30) { 
	// 	engine.placeBet(500000, 150, false);			
	// } else if (randomized >= 50 && randomized <60) { 
	// 	engine.placeBet(300000, 343, false);			
	// } else if (randomized == 61) { 
	// 	engine.placeBet(2000000, 150, false);			
	// }
	// cashed_out
	console.log('NUMBER CONSECUTIVE REDS: ' + numconsecreds); 
	console.log('LAST CASHOUT MULTIPLIER -- ' + lastcashoutmultiplier + " (" + numconseclosses + " consecutive losses)"); 

	game_data = {}; 
	var avgbuster = bustcumulativetotal / gamesplayed;
	if (totalmoneylost >= maxmoneythatcanbelost) { 
		console.log('GAME STOPPED! - we have lost the most we are allowed to lose'); 
		// rollingaverage.length
		console.log('AVERAGE BUST SINCE START: ' + avgbuster); 
		engine.stop(); 
	}

	if (numgameslost >= maxlosers) { 
		console.log('max losers reached, stopping'); 
		engine.stop(); 
	}
 
	// if (lastcrash < 111 && randomized == 44) { 
	// 	initialbetamount = 1337; 
	// 	// if (randomized > 77) { 
	// 	// 	initialbetamount = 1888; 
	// 	// } else if  { 
	// 	// } else { 
	// 	// 	initialbetamount = 1337; 
	// 	// }		
	// } else if (randomized > 75){ 
	// 	initialbetamount = 1337; 
	// } else if (randomized <= 75 && randomized > 25) { 
	// 	initialbetamount = 1137; 
	// } else if (randomized < 10) { 
	// 	initialbetamount = initialbetamount * lastcrash; 
	if (initialbetamount > 2300) {
		if (last_state == 'WON') { 
			if (randomized % 4 == 0) { 
				initialbetamount = originalbetamount * 1.084;
				modifiedorigbetamount = initialbetamount;  
			}
		} else if (last_state == 'LOST') { 
			if (lastcrash < 110) { 
				initialbetamount = 1500; 
			} else { 
				if (randomized % 5 == 0) { 
					initialbetamount = modifiedorigbetamount * 1.022;  
				} else { 
					initialbetamount = originalbetamount; 
				}				
			}
		} else { 


		}
	 	
	} 


	if (initialbetamount > 2800) { 
		initialbetamount = 1500; 
	}


	if (numconsecreds > 3 && last_state == 'WON') { 
		initialbetamount = initialbetamount * 1.7; 
		numconseclosses = 0; 
	} 
	if (numconsecreds > 3 && last_state == 'LOST') { 
		initialbetamount = initialbetamount * 2.15; 
	} 

	if (numconseclosses > 2 && numconsecreds > 7) { 
		initialbetamount = initialbetamount * 3
	} 

	if (numconsecwins > 9) { 
		numconsecwins = numconsecwins - 250; 
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



	if (initialbetamount == undefined) { 
		initialbetamount = modifiedorigbetamount * 1.062; 
	}
	playing = true; 
	if (cur_random % 3 == 0) { 
		console.log('skippy mc dippy'); 
		playing = false; 
	} else if (cur_random % 6 == 0) { 
		console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 176)'); 
		engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 176, false); 
	} else if (cur_random % 8 == 0) { 
		console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 3314)'); 
		engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 3314, false); 

	} else { 
		console.log('PLACING BET FOR ' + initialbetamount + ' (TP: 314)'); 
		engine.placeBet(Math.round(initialbetamount).toFixed(0)*100, 314, false); 
	}
 

	


	if (gamesplayed == 0) { 
		console.log('No games elapsed, we would bet 1000 bits for 2x.'); 
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
		totalmoneywon = totalmoneywon + initialbetamount; 
		numgameswon++; 
		numconseclosses = 0; 
		console.log ('WINNER WINNER CHICKEN DINNER'); 
		numconsecwins = numconsecwins + 1; 
	} 



	if (data.stopped_at < 105) { 
		initialbetamount = initialbetamount * 2.3;
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
		if (randomized > 55 && randomized < 78) { 
			totalmoneylost = totalmoneylost + initialbetamount; 
			initialbetamount = 1000;
			console.log ('LOSER LOSER ITS A DOOZER!');
			if (randomized % 3 == 0)  { 
				initialbetamount = initialbetamount * 1.11; 
			} else { 
				initialbetamount = originalbetamount; 
			}

		} else { 
			if (randomized > 50) { 
				initialbetamount = initialbetamount * 1.975; 
				if (initialbetamount > engine.getBalance()) { 
					initialbetamount = engine.getBalance() * 0.25; 
					console.log('reduced bet amount to 25 percent of account amount'); 
				} 
			} else { 
				initialbetamount = initialbetamount * 0.975; 
			}			
			if (initialbetamount <= 0) { 
				initialbetamount = 1432; 
			}
		}
	}

	if (crash_state == 'NOT_PLAYED') { 
		numskipped++; 
	}
}; 


