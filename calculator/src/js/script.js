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
		}else if(btnValue.indexOf("+/-")>-1){
			document.getElementById("calcLED").value = currentcalcLED*-1;
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
		}else if(btnValue.indexOf("~")>-1){
			var temp = btnValue.split("~");
			document.getElementById("calcLED").value = currentcalcLED.toString().replace(new RegExp(temp[0], 'g'),temp[1]);
		}else if(btnValue.indexOf("^2")>-1){
			document.getElementById("calcLED").value = currentcalcLED * currentcalcLED;
		}else if(btnValue.indexOf("^3")>-1){
			document.getElementById("calcLED").value = currentcalcLED * currentcalcLED * currentcalcLED;
		}else if(parseInt(btnValue) >= 0){
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
	"17" : "17, 2, 11, 0, 1, 1 | 1",
	"18" : "18, 3, 101, 0, 1|0, 1 | 0 | 1",
	"19" : "19, 3, 44, 0, 2|x2, 2 | 2 | x2",
	"20" : "20, 2, 35, 0, +3|5, +3 | 5",
	"21" : "21, 3, 56, 0, 1|+5, +5 | 1 | +5",
	"22" : "22, 4, 9, 0, +2|/3|1, +2 | 1 | /3 | +2",
	"23" : "23, 4, 10, 15, 0|+2|/5, /5 | +2 | 0 | /5",
	"24" : "24, 5, 210, 0, -5|+5|5|2, 2 | 5 | -5 | 5 | +5",
	"25" : "25, 4, 2020, 40, 0|+4|/2, 0 | +4 | /2 | 0",
	"26" : "26, 4, 11, 0, 12|<<, 12 | << | 12 | <<",
	"27" : "27, 4, 102, 0, 10|+1|<<, 10 | 10 | << | +1",
	"28" : "28, 4, 222, 0, 1|1~2, 1 | 1 | 1 | 1~2",
	"29" : "29, 4, 93, 0, +6|x7|6~9, +6 | 6~9 | x7 | 6~9",
	"30" : "30, 6, 2321, 0, 1|2|1~2|2~3, 1 | 2 | 2~3 | 1~2 | 2 | 1",
	"31" : "31, 5, 24, 0, +9|x2|8~4, +9 | +9 | 8~4 | x2 | 8~4",
	"32" : "32, 5, 29, 11, /2|+3|1~2|2~9, +3 | 1~2 | /2 | 2~9 | 1~2",
	"33" : "33, 5, 20, 36, +3|/3|1~2, /3 | /3 | +3 | +3 | 1~2",
	"34" : "34, 4, 15, 2, /3|1|x2|4~5, 1 | /3 | x2 | 4~5",
	"35" : "35, 4, 414, 1234, 23~41|24~14|12~24|14~2, 12~24 | 24~14 | 14~2 | 23~41",
	"36" : "36, 4, -85, 0, +6|5|-7, -7 | -7 | +6 | 5",
	"37" : "37, 3, 9, 0, -1|-2|^2, -1 | -2 | ^2",
	"38" : "38, 4, -120, 0, x5|-6|4, 4 | -6 | 4 | x5",
	"39" : "39, 3, 144, 0, -1|2|^2, -1 | 2 | ^2",
	"40" : "40, 1, 5, -5, +/-, +/-",
	"41" : "41, 3, -6, 0, +4|+2|+/-, +4 | +2 | +/-",
	"42" : "42, 4, -13, 0, +3|-7|+/-, +3 | +3 | +/- | -7",
	"43" : "43, 4, 60, 0, +5|-10|x4|+/-, -10 | +/- | +5 | x4",
	"44" : "44, 5, 52, 44, +9|/2|x4|+/-, /2 | +/- | +9 | x4 | +/-",
	"45" : "45, 5, 10, 9, +5|x5|+/-, +/- | +5 | +5 | x5 | +5",
	"46" : "46, 5, 12, 14, 6|+5|/8|+/-, +/- | +5 | 6 | /8 | +/-",
	"47" : "47, 4, 13, 55, +9|+/-|<<, << | +/- | +9 | +9 ",
	"48" : "48, 5, 245, 0, -3|5|x4|+/-, -3 | -3 | x4 | +/- | 5",
	"49" : "49, 4, 12, 39, x-3|/3|+9|+/-, /3 | +/- | +9 | x-3",
	"50" : "50, 6, 126, 111, x3|-9|+/-|<<, << | x3 | +/- | -9 | x3 | +/-"
};