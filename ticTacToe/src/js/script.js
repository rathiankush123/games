var moveCount = 0;

function play(){
	document.getElementById("play").setAttribute("hidden","true");
	document.getElementById("tttBoard").removeAttribute("hidden");

	document.getElementById("notification").innerHTML = "Blue's turn";
}

function toeClicked(cubeId){

	moveCount += 1;
	var prim = "btn-outline-primary";
	var warn = "btn-outline-warning";

	var allBtns = document.getElementById("tttBoard").getElementsByTagName("button");

	var targetCube = document.getElementById(cubeId);
	
	if (targetCube.classList.toString().includes(prim)){
		targetCube.classList.remove(prim);
    	targetCube.classList.add("btn-primary");
    	targetCube.setAttribute("disabled","disabled");
	}
	else if(targetCube.classList.toString().includes(warn)){
		targetCube.classList.remove(warn);
    	targetCube.classList.add("btn-warning");
    	targetCube.setAttribute("disabled","disabled");
	}

	for (var i = allBtns.length - 1; i >= 0; i--) {
		if (allBtns[i].classList.toString().includes(prim)){
			allBtns[i].classList.remove(prim);
    		allBtns[i].classList.add(warn);
		}
		else if (allBtns[i].classList.toString().includes(warn)){
			allBtns[i].classList.remove(warn);
    		allBtns[i].classList.add(prim);
		}
	};

	var result = "null";
	if(moveCount > 4){
		result = checkForWin();	
	}
	if(result.includes("wins")){
		for (var i = allBtns.length - 1; i >= 0; i--) {
			allBtns[i].setAttribute("disabled","disabled");
			document.getElementById("notification").classList.add("hightlight");
		};
	}
	updateNotification(result);

}

function updateNotification(result){
	if(moveCount == 9 && !result.includes("wins")){
		document.getElementById("notification").innerHTML = "Game Over";
		document.getElementById("notification").classList.add("hightlight");
	}else{
		if(result.includes("null")){
			if (moveCount % 2 != 0){
			document.getElementById("notification").innerHTML = "Yellow's turn";
			}else{
				document.getElementById("notification").innerHTML = "Blue's turn";
			}
			
		}else{
			document.getElementById("notification").innerHTML = result;	
		}
	}
}

function checkForWin(){

	var cubeOne = document.getElementById("one").classList.toString();
	var cubeTwo = document.getElementById("two").classList.toString();
	var cubeThree = document.getElementById("three").classList.toString();
	var cubeFour = document.getElementById("four").classList.toString();
	var cubeFive = document.getElementById("five").classList.toString();
	var cubeSix = document.getElementById("six").classList.toString();
	var cubeSeven = document.getElementById("seven").classList.toString();
	var cubeEight = document.getElementById("eight").classList.toString();
	var cubeNine = document.getElementById("nine").classList.toString();

	//123
	if(cubeOne==cubeTwo && cubeTwo==cubeThree){
		if(cubeOne.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeOne.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//456
	if(cubeFour==cubeFive && cubeFive==cubeSix){
		console.log("456");
		if(cubeFour.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeFour.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//789
	if(cubeSeven==cubeEight && cubeEight==cubeNine){
		if(cubeSeven.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeSeven.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//147
	if(cubeOne==cubeFour && cubeFour==cubeSeven){
		if(cubeOne.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeOne.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//258
	if(cubeTwo==cubeFive && cubeFive==cubeEight){
		if(cubeTwo.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeTwo.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//369
	if(cubeThree==cubeSix && cubeSix==cubeNine){
		if(cubeThree.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeThree.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//159
	if(cubeOne==cubeFive && cubeFive==cubeNine){
		if(cubeOne.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeOne.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	//357
	if(cubeThree==cubeFive && cubeFive==cubeSeven){
		if(cubeThree.includes("btn-primary")){
			return "Blue wins";
		}else if(cubeThree.includes("btn-warning")){
			return "Yellow wins";
		}
	}
	return "null";
}

function replay(){

	var allBtns = document.getElementById("tttBoard").getElementsByTagName("button");

	for (var i = allBtns.length - 1; i >= 0; i--) {
		allBtns[i].removeAttribute("disabled");
		allBtns[i].classList.remove("btn-warning");
		allBtns[i].classList.remove("btn-outline-warning");
		allBtns[i].classList.remove("btn-primary");
		
		if(!allBtns[i].classList.toString().includes("btn-outline-primary")){
			allBtns[i].classList.add("btn-outline-primary");
		}
	};
	moveCount = 0
	document.getElementById("notification").innerHTML = "Blue's turn";
	document.getElementById("notification").classList.remove("hightlight");
}
