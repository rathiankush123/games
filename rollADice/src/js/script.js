function rollTheDice(){

	var numberOfDice = document.getElementById("numberOfDice").value;
	var tempDiv = document.createElement("div");
	document.getElementById("diceFloor").innerHTML = "";
	var total = 0
	for (i = 0; i < numberOfDice; i++) {
		var diceValue = 0;
		do{
			diceValue = Math.floor(Math.random() * 7);
		}while(diceValue == 0);
		console.log(diceValue);
	    tempDiv.innerHTML += showDice(diceValue);
	    total += diceValue;
	}
	document.getElementById("diceFloor").appendChild(tempDiv);
	document.getElementById("ultimateTotal").innerHTML = "Total : "+total;
}



function showDice(diceValue){
	var temp = "";
	switch(diceValue) {
	    case 1:
	    	temp = '<img src="./rollADice/media/one.png">';
	        break;
	    case 2:
	    	temp = '<img src="./rollADice/media/two.png">';
	        break;
	    case 3:
	    	temp = '<img src="./rollADice/media/three.png">';
	        break;
	    case 4:
	    	temp = '<img src="./rollADice/media/four.png">';
	        break;
	    case 5:
	    	temp = '<img src="./rollADice/media/five.png">';
	        break;
	    case 6:
	    	temp = '<img src="./rollADice/media/six.png">';
	        break;
	}
	return temp;
}