let dragged; 

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