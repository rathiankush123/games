$(function () {
  $('[data-toggle="popover"]').popover({html:true})
})


//global vars
var brickValues = Array(50).fill(0).map((e,i)=>i+1);
var brickValues_first = brickValues.slice(0,25);
var brickValues_second = brickValues.slice(25);
var global_bf = null;
var global_sf = null;
var currentAim = 1;
var indexOfSecBrickrow = 0;


function startTimer(){
	var sec = 0;
	function pad ( val ) { return val > 9 ? val : "0" + val; }
	intervalObj = setInterval( function(){
	    document.getElementById("seconds").innerHTML=pad(++sec%60);
	    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
	}, 1000);
	console.log(global_bf);
	console.log(global_sf);
}

function stopTimer(){
	clearInterval(intervalObj);
}

function resetTime(){
		if(currentAim > 1){
			stopTimer();
			document.getElementById("timerWrapper").classList.remove('badge-success');
			document.getElementById("timerWrapper").classList.add('badge-dark');
		}
	    document.getElementById("seconds").innerHTML="00";
	    document.getElementById("minutes").innerHTML="00";
	    currentAim = 1;
	    document.getElementById("showAim").innerHTML = "Click on : 01";
}

function loadBricks(){

	resetTime();
	document.getElementById("playBtn50").innerHTML = '<img src="./50clicks/media/replay.png">';
	global_bf = brickValues_first.sort(function(a, b){return 0.5 - Math.random()});
	global_sf = brickValues_second.sort(function(a, b){return 0.5 - Math.random()});
	var index = -1;
	for (var i = 1; i <= 5; i++) {
		for (var j = 1; j <= 5; j++) {
			index += 1;
			document.getElementById(i+"x"+j).innerHTML = global_bf[index] < 10 ? "0"+global_bf[index] : global_bf[index];
		};		
	};
}

function updateAimBox(){
	if(currentAim<51){
		var num = (currentAim<10) ? "0"+currentAim : currentAim;
		document.getElementById("showAim").innerHTML = "Click on : "+num;
	}else{
		document.getElementById("showAim").innerHTML = "Yay!! It's finished.";
	}
}

function burstBrick(){
	var clickedBtn = document.getElementById(event.srcElement.id);
	
	if(parseInt(clickedBtn.innerHTML) == currentAim){
		var timerDiv = document.getElementById("timerWrapper");
		if(currentAim == 1){
			document.getElementById("timerWrapper").classList.remove('badge-dark');
			document.getElementById("timerWrapper").classList.add('badge-success');
			startTimer();
		}else if(currentAim == 50){
			document.getElementById("timerWrapper").classList.remove('badge-success');
			document.getElementById("timerWrapper").classList.add('badge-danger');
			stopTimer();
		}

		currentAim += 1;
		if(indexOfSecBrickrow < 25){
			clickedBtn.innerHTML = global_sf[indexOfSecBrickrow];
			indexOfSecBrickrow += 1;
		}else{
			clickedBtn.innerHTML = "00";
		}

		updateAimBox();
	}
}

