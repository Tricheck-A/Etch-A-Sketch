
// GET BUTTONS & CREATE VARIABLES FOR GRID CELLS
const whiteColorBtn = document.getElementById('whiteColorBtn');
const rainbowColorBtn = document.getElementById('rainbowColorBtn');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const gridBtn = document.getElementById('gridBtn');

let container = document.getElementById('container');
let rowCount = 8;
let colCount = 8;
let cellCount = rowCount * colCount;
let cellSize = (100/rowCount) + "%";

let color = "#04ffab";







// CREATE DYNAMIC GRID

function createCells () {
  for (i = 1; i <= cellCount; i++) {
  container.innerHTML += '<div class = "cells" id = "cell-' + [i] + '"></div>';
  };
}

function createGridFormat () {
  container.style.gridTemplateColumns = 'repeat(' + colCount + ', ' + cellSize + ')';
  container.style.gridTemplateRows = 'repeat(' + rowCount + ', ' + cellSize + ')';
}

createCells();
createGridFormat();







// CREATE DENSITY SLIDER - UPDATE PARAGRAPH & DENSITY OF GRID

// variables for the slider, the slider value, and slider output for paragraph
const densitySlider = document.getElementById('densitySlider');
let densityOutput = document.getElementById('densityOutput');
let densityValue = densitySlider.value;

function removeAllChildNode(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function updateDensity (){
  densityValue = densitySlider.value;
  removeAllChildNode(container);
  rowCount = densityValue;
  colCount = densityValue;
  cellCount = rowCount * colCount;
  cellSize = (100/rowCount) + "%";
};

// updating Grid after sliding
densitySlider.addEventListener('click', function () {
  updateDensity();
  createCells();
  createGridFormat();
  cells = document.querySelectorAll('.cells');
  createMouseListeners();
  listenForMouseover();
});


// default Density Paragraph Output
densityOutput.innerHTML = densityValue + ' x ' + densityValue;

// updating Density Paragraph output while sliding
densitySlider.addEventListener('input', function () {
  densityValue = densitySlider.value;
  densityOutput.innerHTML = densityValue + ' x ' + densityValue;
});





// CREATE BUTTON-EVENT LISTENERS


// White Button
whiteColorBtn.addEventListener('click', function(){
  color = "white";
});



// Rainbow Button
let randomColor;
function generateRandomColor (){
  randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  color = randomColor;
};
rainbowColorBtn.addEventListener('click', function() {
  generateRandomColor();
});


// Color Picker Button
colorPickerBtn.addEventListener('click', function(){
  colorPickerBtn.addEventListener('change', watchColorPicker, false);
  function watchColorPicker(event) {
    color = event.target.value;
  }
});


// Eraser Button
eraserBtn.addEventListener('click', function(){
  color = "";
});


// Clear Button
clearBtn.addEventListener('click', function(){
  for (let i=0; i < cells.length; i++){
    cells[i].style.background = "";
  };
});


// Grid Button - with switch between enable/disable
gridBtn.addEventListener('click', function(){
  if (gridBtn.textContent == "DISABLE GRID"){
    for (let i=0; i < cells.length; i++){
      cells[i].style.border = "0px";
    };
    gridBtn.textContent = "ENABLE GRID";

  } else {
    for (let i=0; i < cells.length; i++){
      cells[i].style.border = "1px solid white";
    };
    gridBtn.textContent = "DISABLE GRID";
  }
});







// CREATE MOUSEDON-HOVER EVENT - CHANGE CELL COLOR

let mouseIsDown = false;

function createMouseListeners(){
window.container.addEventListener('mousedown', function(event) {
  event.preventDefault();
  mouseIsDown = true;
});
window.container.addEventListener('mouseup', function() {
  mouseIsDown = false;
});
};

createMouseListeners();




// create a mouseover + mousedown listener and changes color of single cell 
// based on index & color choice

let cells = document.querySelectorAll('.cells');

let prevIndex = -1;

function listenForMouseover(){
cells.forEach(function(cell, index){
  (function(i){
    cell.addEventListener('mouseover', function(){
      if(mouseIsDown){
        if(prevIndex !== -1){
          if(color == randomColor){
            generateRandomColor();
          }else {
            cells[i].style.background = color;
            cells[i].style.opacity = colorOpacity;
          };
        };
      cell.style.background = color;
      cell.style.opacity = colorOpacity;
      prevIndex = i;
    }});
  }(index))
});
};

listenForMouseover();






// CREATE OPACITY SLIDER - UPDATE PARAGRAPH & OPACITY OF COLORIZING

// variables for the slider, the slider value, and slider output for paragraph
const opacitySlider = document.getElementById('opacitySlider');
let opacityOutput = document.getElementById('opacityOutput');
let colorOpacity = (opacitySlider.value / 100).toString();

// default Opacity & Output
opacityOutput.innerHTML = 'OPACITY: ' + opacitySlider.value + '%';

// updating values while sliding
opacitySlider.addEventListener('input', function () {
  opacityOutput.innerHTML = 'OPACITY: ' + this.value + '%';
  colorOpacity = (opacitySlider.value / 100).toString();
})







