$(function () {
  $('[data-toggle="popover"]').popover({html:true})
})

function loadLevel(levelNumber){

	if(levelNumber <= Object.getOwnPropertyNames(levels).length ){

		currentLevelData = levels[levelNumber].split(",");
		moves = currentLevelData[1];
		goal = currentLevelData[2];
		defaultValue = currentLevelData[3];
		btnOptions = currentLevelData[4].split("|");
		solution = currentLevelData[5];
		
		document.getElementById("level").innerHTML = "Level : "+levelNumber;
		document.getElementById("moves").innerHTML = "Moves : "+moves;
		document.getElementById("goal").innerHTML = goal;
		document.getElementById("calcLED").value = defaultValue;

		//set solution in HINT button
		document.getElementById("CALCfour").setAttribute("data-content","Answer : "+solution);

		//available buttons are 2,5,6,8,9
		availableBtns = ["CALCtwo","CALCfive","CALCsix","CALCeight","CALCnine"]

		//set maths buttons
		for (var i = btnOptions.length - 1; i >= 0; i--) {
			var setThisBtn = document.getElementById(availableBtns.shift());
			setThisBtn.innerHTML = btnOptions[i].trim();
			setThisBtn.setAttribute("onclick","executeMathFun('"+btnOptions[i].trim()+"')");
		};

		for (var i = availableBtns.length - 1; i >= 0; i--) {
			var temp = document.getElementById(availableBtns.shift());
			temp.innerHTML = "";
			temp.removeAttribute("onclick");
		};

	}else{
		alert("Thank you for playing. We're creating more levels for you.");
		loadLevel("1");
	}

	
}



function executeMathFun(btnValue){

	//reduce a move by one
	var moves = document.getElementById("moves").innerHTML.replace( /^\D+/g, '');

	if(moves>0){

		moves = moves - 1;
		document.getElementById("moves").innerHTML = "Moves : "+ moves;
		var currentcalcLED = parseInt(document.getElementById("calcLED").value);

		if(btnValue.indexOf("x")>-1){
			var btnValueInt = parseInt(btnValue.substr(1));
			document.getElementById("calcLED").value = currentcalcLED * btnValueInt;
		}else if (btnValue.indexOf("/")>-1){
			var btnValueInt = parseInt(btnValue.substr(1));
			document.getElementById("calcLED").value = currentcalcLED / btnValueInt;
					
		}else if (btnValue.indexOf("+")>-1){
			var btnValueInt = parseInt(btnValue.substr(1));
			document.getElementById("calcLED").value = currentcalcLED + btnValueInt;
					
		}else if (btnValue.indexOf("-")>-1){
			var btnValueInt = parseInt(btnValue.substr(1));
			document.getElementById("calcLED").value = currentcalcLED - btnValueInt;
		}else if(btnValue.indexOf("<<")>-1){
			if (currentcalcLED > -10 && currentcalcLED < 10){
				document.getElementById("calcLED").value = "0";
			}else{
				currentcalcLED = parseInt(currentcalcLED.toString().slice(0, -1));
				document.getElementById("calcLED").value = currentcalcLED;
			}
		}else if(parseInt(btnValue)){
			if(currentcalcLED == 0){
				currentcalcLED = btnValue;
			}else{
				currentcalcLED = currentcalcLED*10 + parseInt(btnValue);
			}
			document.getElementById("calcLED").value = currentcalcLED;
		}

		if(checkForWin()){
			var yaayMSGArr = ["Well played buddy!!", "Ewww Ewww Ewww Ewww Ewww, you're awesome.", "Wow, how can you be so smart?","Booyaaah!! That is how it's done.","Nice, lets hit the next one.","Good move. Ready for Next level?","Whoa!! That was cool.", "You're a genius buddy.", "Whoa, How did you do that?", "You are a mathematician! You know that, right?"];
			document.getElementById("yaayMSG").innerHTML = yaayMSGArr[Math.floor(Math.random() * 10)];
			$('#winModal').modal('show');
		}
	}
	else{
		alert("Sorry, You're out of moves.");
		clearLED();
	}
}

function loadNextLevel(){
	var level = document.getElementById("level").innerHTML.replace( /^\D+/g, '');
	loadLevel(parseInt(level)+1);
}

function switchLevel(){
	loadLevel(document.getElementById("switchLevelInput").value);
	$('#CALCseven').popover('hide');
	document.getElementById("CALCplayBtn").style.display = "none";
}

function clearLED(){
	var level = document.getElementById("level").innerHTML.replace( /^\D+/g, '').trim();
	loadLevel(level);
}

function checkForWin(){
	return document.getElementById("calcLED").value.trim() == document.getElementById("goal").innerHTML.trim();
}

function main(){
	loadLevel("1");
	document.getElementById("CALCplayBtn").style.display = "none";
}

var levels = {
    "1" : "1, 2, 2, 0, +1, +1 | +1",
	"2" : "2, 3, 8, 0, +2 | +3, +2 | +3 | +3",
	"3" : "3, 3, 12, 0, +1 | +2 | x4, +1 | +2 | x4",
	"4" : "4, 3, 7, 1, +4 | -2, +4 | +4 | -2",
	"5" : "5, 3, 4, 3, +4 | x4 | /4, x4 | +4 | /4",
	"6" : "6, 4, 64, 0, +2 | x4, +2 | +2 | x4 | x4",
	"7" : "7, 3, 5, 4, +3 | x3 | /3, x3 | +3 | /3",
	"8" : "8, 3, 4, 4321, << , << | << | << | <<",
	"9" : "9, 3, 4, 0, +8 | x5 | << , +8 | x5 | <<",
	"10" : "10, 4, 9, 50, /5 | x3 | <<, x3 | /5 | << | x3",
	"11" : "11, 3, 100, 99, -8 | x11 | <<, -8 | x11 | <<",
	"12" : "12, 5, 404, 0, +8|x10|/2, +8 | x10 | x10 | +8 | /2",
	"13" : "13, 4, 23, 171, x2|-9|<<, -9 | << | x2 | -9",
	"14" : "14, 5, 21, 0, +5 | x3 | x5 | <<, +5 | x5 | << | +5 | x3",
	"15" : "15, 3, 50, 10, x3|x2|-5, x3 | -5 | x2",
	"16" : "16, 5, 2, 0, +4|x9|<<, +4 | x9 | << | x9 | <<",
	"17" : "17, 2, 11, 0, 1, 1 | 1"
};