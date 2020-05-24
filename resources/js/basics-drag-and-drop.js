let dragged;
counter=0;

function onDragOver(event) {
  // Prevent default to allow drop
  event.preventDefault();
}

function onDragLeave(event) {
  event.target.style.background = '';
}

function onDragEnter(event) {
  const target = event.target;
  if (target && dragged) {
      event.preventDefault();
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = 'move'
      target.style.background = '#1f904e';
  }
}

function onDrop(event) {
  const target = event.target;
  var targetName = target.children[0].innerHTML;
  if (target && dragged && targetName === dragged.id) {
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    dragged.parentNode.removeChild(dragged);
    dragged.style.opacity = '';
    target.appendChild(dragged);
    dragged.style.draggable = false;
	$('#infoModal').modal('show');

	if(dragged.id=="Weißer Hai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/White_shark.jpg";
	document.getElementById("text").textContent="Der weiße Hai kommt in fast allen Meeren der Welt vor. Am häufigsten werden sie allerdings in Australien, im westlichen Nordatlantik, vor der Südküste Afrikas und im Mittelmeer beobachtet. Weiße Haie erbeuten alle möglichen Meerestiere, etwa Robben, kleine Wale, Thunfische oder Tintenfische. Menschen stehen glücklicherweise nicht auf dem Speiseplan. Sie werden im Schnitt 4 bis 5 Meter lang und bis zu 2000 Kilogramm schwer. Forscher vermuten, dass sie etwa so alt wie Menschen werden können.";

	}
	if(dragged.id=="Tigerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Tiger_shark.jpg";
	document.getElementById("text").textContent="Der Tigerhai kann über 7 m und ein Gewicht von über 800 kg erreichen, und bis zu 50 Jahre alt werden. Der Tigerhai frisst eigentlich fast alles: andere Haifische, Knochenfische, Seevögel, Meeressäuger, Meeresschildkröten, Wirbellose (also Krebse und Insekten), usw. Zur Nahrungsvielfältigkeit des Tigerhais gehört neben den Fischen und den Meeresschildkröten auch Meeressäuger wie kleine Wale, Delfine und sogar andere Haie.";

	}
	if(dragged.id=="Sägehai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Sawfish.jpg";
	document.getElementById("text").textContent="Sägehaie sind für ihre lange und schmale Schnauze, die aus kleinen Zähnen bestehen bekannt. Sie fressen kleine Fische, Krebstiere aber auch Tintenfischarten. Die größte Art bildet der Sechskiemer-Sägehai mit etwa 1,5 Metern. Sägehaie findet man hauptsächlich im Atlantik.";

	}
	if(dragged.id=="Walhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Whale_Shark.jpg";
	document.getElementById("text").textContent="Der größte Hai ist der Walhai. Er hat eine eher bläuliche oder gräuliche Farbe. Außerdem lebt der Walhai in den tropischen oder subtropischen Regionen auf dem offenen Meer. Forscher meinen, dass der Walhai bis zu 20 Meter lang und ein Gewicht von bis zu 35 Tonnen erreichen kann. Im Schnitt wird er jedoch nur bis zu 15 Tonnen schwer und 14 - 15 Meter groß. Walhaie werden mit bis zu 100 Jahre, im Vergleich zu vielen anderen Haiarten, sehr alt. Er besitzt, mit bis zu 15cm Dicke, eine sehr robuste Haut. Der Walhai ernäht sich von als sogenannter Filtrierer, von Plankton, Quallen, Sardinen und andere Kleinlebewesen, indem er das Meerwasser nach diesen filtert";
	}
	if(dragged.id=="Hammerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Hammerhead_Shark.jpg";
	document.getElementById("text").textContent="Wurde nach seiner besonderen Kopfform benannt. Er lebt ungefähr 20-25 Jahre und kann höchstens 5,5 bis 6,1 Meter lang werden. Er frisst wirbellose Tiere wie Krebse und Kalmaren, sowie andere kleine Fische.";

	}

	document.getElementById("infoModalLongTitle").innerHTML = "Richtig! der "+dragged.id;
	document.getElementById("infoModalLongTitle").style.color = '#1f904e';
	counter=counter+1;
	if(counter==5){
		
	 document.getElementById("gewonnenButton").style="display:initial; font-family: 'Comfortaa';";

	}
  }
	else{
	$('#infoModal').modal('show')

	document.getElementById("infoModalLongTitle").innerHTML = "Falsch! der " + targetName;
	document.getElementById("infoModalLongTitle").style.color = '#ff0000';

	if(targetName=="Weißer Hai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/White_shark.jpg";
	document.getElementById("text").textContent="Der weiße Hai kommt in fast allen Meeren der Welt vor. Am häufigsten werden sie allerdings in Australien, im westlichen Nordatlantik, vor der Südküste Afrikas und im Mittelmeer beobachtet. Weiße Haie erbeuten alle möglichen Meerestiere, etwa Robben, kleine Wale, Thunfische oder Tintenfische. Menschen stehen glücklicherweise nicht auf dem Speiseplan. Sie werden im Schnitt 4 bis 5 Meter lang und bis zu 2000 Kilogramm schwer. Forscher vermuten, dass sie etwa so alt wie Menschen werden können.";

	}
	if(targetName=="Tigerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Tiger_shark.jpg";
	document.getElementById("text").textContent="Der Tigerhai kann über 7 m und ein Gewicht von über 800 kg erreichen, und bis zu 50 Jahre alt werden. Der Tigerhai frisst eigentlich fast alles: andere Haifische, Knochenfische, Seevögel, Meeressäuger, Meeresschildkröten, Wirbellose (also Krebse und Insekten), usw. Zur Nahrungsvielfältigkeit des Tigerhais gehört neben den Fischen und den Meeresschildkröten auch Meeressäuger wie kleine Wale, Delfine und sogar andere Haie.";

	}
	if(targetName=="Sägehai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Sawfish.jpg";
	document.getElementById("text").textContent="Sägehaie sind für ihre lange und schmale Schnauze, die aus kleinen Zähnen bestehen bekannt. Sie fressen kleine Fische, Krebstiere aber auch Tintenfischarten. Die größte Art bildet der Sechskiemer-Sägehai mit etwa 1,5 Metern. Sägehaie findet man hauptsächlich im Atlantik.";

	}
	if(targetName=="Walhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Whale_Shark.jpg";
	document.getElementById("text").textContent="Der größte Hai ist der Walhai. Er hat eine eher bläuliche oder gräuliche Farbe. Außerdem lebt der Walhai in den tropischen oder subtropischen Regionen auf dem offenen Meer. Forscher meinen, dass der Walhai bis zu 20 Meter lang und ein Gewicht von bis zu 35 Tonnen erreichen kann. Im Schnitt wird er jedoch nur bis zu 15 Tonnen schwer und 14 - 15 Meter groß. Walhaie werden mit bis zu 100 Jahre, im Vergleich zu vielen anderen Haiarten, sehr alt. Er besitzt, mit bis zu 15cm Dicke, eine sehr robuste Haut. Der Walhai ernäht sich von als sogenannter Filtrierer, von Plankton, Quallen, Sardinen und andere Kleinlebewesen, indem er das Meerwasser nach diesen filtert";
	}
	if(targetName=="Hammerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Hammerhead_Shark.jpg";
	document.getElementById("text").textContent="Wurde nach seiner besonderen Kopfform benannt. Er lebt ungefähr 20-25 Jahre und kann höchstens 5,5 bis 6,1 Meter lang werden. Er frisst wirbellose Tiere wie Krebse und Kalmaren, sowie andere kleine Fische.";

	}
	
	}
  target.style.backgroundColor = '';
}

function onDragStart(event) {
  let target = event.target;
  if (target && target.nodeName === 'IMG') { // If target is an image
      dragged = target;
      event.dataTransfer.setData('text', target.id);
      event.dataTransfer.dropEffect = 'move';
      // Make it half transparent
      event.target.style.opacity = .3;
  }
}

function onDragEnd(event) {
  if (event.target && event.target.nodeName === 'IMG') {
      // Reset the transparency
      event.target.style.opacity = ''; // reset opacity when drag ends       
      dragged = null;
      // todo condition (is false then show modal)
      
  }
}


const sharks = document.querySelector('.sharks');
const dropZone = document.querySelectorAll('.drop-zone');

// Adding event listeners
sharks.addEventListener('dragstart', onDragStart);
sharks.addEventListener('dragend', onDragEnd);
dropZone.forEach(d => {d.addEventListener('drop', onDrop);});
dropZone.forEach(d => {d.addEventListener('dragenter', onDragEnter);});
dropZone.forEach(d => {d.addEventListener('dragleave', onDragLeave);});
dropZone.forEach(d => {d.addEventListener('dragover', onDragOver);});