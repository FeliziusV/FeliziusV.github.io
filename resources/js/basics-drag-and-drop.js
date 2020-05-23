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
  if (target && dragged && target.children[0].innerHTML === dragged.id) {
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    dragged.parentNode.removeChild(dragged);
    dragged.style.opacity = '';
    target.appendChild(dragged);
    dragged.style.draggable = false;
	$('#infoModal').modal('show')
	if(dragged.id=="Weißer Hai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/White_shark.jpg";
	document.getElementById("text").textContent="Der weiße Hai kommt in fast allen Meeren der Am vor. Doch am häufigsten werden sie in Australien, im westlichen Nordatlantik, vor der Südküste Afrikas und im Mittelmeer beobachtet. Weiße Haie erbeuten alle möglichen Meerestiere, etwa Robben, kleine Wale, Thunfische oder Tintenfische. Wenn nötig, fressen sie aber auch Aas. Menschen stehen glücklicherweise nicht auf dem Speiseplan. Sie werden im Schnitt 4 bis 5 Meter lang und bis zu 2000 Kilogramm schwer. Forscher vermuten jedoch, dass sie etwa so alt wie Menschen werden können.";

	}
	if(dragged.id=="Tigerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Tiger_shark.jpg";
	document.getElementById("text").textContent="Der Tigerhai kann je nachdem ob er weiblich oder männlich ist 325 bis 550 Zentimeter lang werden oder 900 Kilogramm wiegen. Der Tigerhai kann über 7 m und ein Gewicht von über 800 kg erreichen. Außerdem wird er maximal ungefähr 750 cm lang aber seine durchschnittliche Länge beträgt ca. 500 cm. Sie können bis zu 50 Jahre alt werden. Der Tigerhai frisst eigentlich fast alles: andere Haifische, Knochenfische, Seevögel, Meeressäuger, Meeresschildkröten, Wirbellose (also Krebse und Insekten).zur Nahrungsvielfältigkeit des Tigerhais gehört neben den Fischen und den Meeresschildkröten auch Meeressäuger wie kleine Wale und  Delfine  sowie andere Haie.";

	}
	if(dragged.id=="Sägehai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Sawfish.jpg";
	document.getElementById("text").textContent="Sägehaie sind für ihre lange und schmale Schnauze, die aus kleinen Zähnen bestehen bekannt. Sie fressen kleine Fische, Krebstiere aber auch Tintenfischarten. Die größte Art bildet der Sechskiemer-Sägehai mit etwa 1,5 Metern. Was du noch wissen solltest ist das Sägehaie im wesentlichen Atlantik leben.";

	}
	if(dragged.id=="Walhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Whale_Shark.jpg";
	document.getElementById("text").textContent="Der größte Hai ist der Walhai. Er hat eine eher bläuliche oder gräuliche Farbe. Außerdem lebt der Walhai in den tropischen oder subtropischen Regionen auf dem offenen Meer. Die Forscher sagen das Walhai bis zu 20 Meter lang und ein Gewichtvon 35 Tonnen erreichen können. Noch dazu werden sie geschätzt 100 Jahre alt.Die dickste Haut, nämlich 10 - 15 cm. Aber normalerweise wird er nur bis zu 15Tonnen schwer und 14 - 15 Meter groß. Der Walhai ernäht sich von Plankton,Quallen, Sardinen und andere Kleinlebewesen.";
	}
	if(dragged.id=="Hammerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Hammerhead_Shark.jpg";
	document.getElementById("text").textContent="Wurde nach seiner besonderen Kopfform benannt. Er lebt ungefähr 20-25 Jahre under kann höchstens 5,5 bis 6,1 Meter lang werden. Er frisst jede Menge wirbellose Tieren wie Krebse und Kalmaren und andere kleine Fische.";

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

	document.getElementById("infoModalLongTitle").innerHTML = "Flasch! der "+dragged.id;
	document.getElementById("infoModalLongTitle").style.color = '#ff0000';

	if(dragged.id=="Weißer Hai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/White_shark.jpg";
	document.getElementById("text").textContent="Der weiße Hai kommt in fast allen Meeren der Am vor. Doch am häufigsten werden sie in Australien, im westlichen Nordatlantik, vor der Südküste Afrikas und im Mittelmeer beobachtet. Weiße Haie erbeuten alle möglichen Meerestiere, etwa Robben, kleine Wale, Thunfische oder Tintenfische. Wenn nötig, fressen sie aber auch Aas. Menschen stehen glücklicherweise nicht auf dem Speiseplan. Sie werden im Schnitt 4 bis 5 Meter lang und bis zu 2000 Kilogramm schwer. Forscher vermuten jedoch, dass sie etwa so alt wie Menschen werden können.";

	}
	if(dragged.id=="Tigerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Tiger_shark.jpg";
	document.getElementById("text").innerHTML="Der Tigerhai kann je nachdem ob er weiblich oder männlich ist 325 bis 550 Zentimeter lang werden oder 900 Kilogramm wiegen. Der Tigerhai kann über 7 m und ein Gewicht von über 800 kg erreichen. Außerdem wird er maximal ungefähr 750 cm lang aber seine durchschnittliche Länge beträgt ca. 500 cm. Sie können bis zu 50 Jahre alt werden. Der Tigerhai frisst eigentlich fast alles: andere Haifische, Knochenfische, Seevögel, Meeressäuger, Meeresschildkröten, Wirbellose (also Krebse und Insekten).zur Nahrungsvielfältigkeit des Tigerhais gehört neben den Fischen und den Meeresschildkröten auch Meeressäuger wie kleine Wale und  Delfine  sowie andere Haie.";

	}
	if(dragged.id=="Sägehai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Sawfish.jpg";
	document.getElementById("text").textContent="Sägehaie sind für ihre lange und schmale Schnauze, die aus kleinen Zähnen bestehen bekannt. Sie fressen kleine Fische, Krebstiere aber auch Tintenfischarten. Die größte Art bildet der Sechskiemer-Sägehai mit etwa 1,5 Metern. Was du noch wissen solltest ist das Sägehaie im wesentlichen Atlantik leben.";

	}
	if(dragged.id=="Walhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Whale_Shark.jpg";
	document.getElementById("text").textContent="Der größte Hai ist der Walhai. Er hat eine eher bläuliche oder gräuliche Farbe. Außerdem lebt der Walhai in den tropischen oder subtropischen Regionen auf dem offenen Meer. Die Forscher sagen das Walhai bis zu 20 Meter lang und ein Gewichtvon 35 Tonnen erreichen können. Noch dazu werden sie geschätzt 100 Jahre alt.Die dickste Haut, nämlich 10 - 15 cm. Aber normalerweise wird er nur bis zu 15Tonnen schwer und 14 - 15 Meter groß. Der Walhai ernäht sich von Plankton,Quallen, Sardinen und andere Kleinlebewesen.";
	}
	if(dragged.id=="Hammerhai"){
	document.getElementById("sharkimage").src="../../resources/binary/img/Hammerhead_Shark.jpg";
	document.getElementById("text").textContent="Wurde nach seiner besonderen Kopfform benannt. Er lebt ungefähr 20-25 Jahre under kann höchstens 5,5 bis 6,1 Meter lang werden. Er frisst jede Menge wirbellose Tieren wie Krebse und Kalmaren und andere kleine Fische.";

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