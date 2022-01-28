
// GET BUTTONS & CREATE VARIABLES FOR GRID CELLS
const blackColorBtn = document.getElementById('blackColorBtn');
const grayScaleBtn = document.getElementById('grayScaleBtn');
const rainbowColorBtn = document.getElementById('rainbowColorBtn');
const colorPickerBtn = document.getElementById('colorPickerBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const gridBtn = document.getElementById('gridBtn');

let container = document.getElementById('container');
let rowCount = 15;
let colCount = 15;
let cellCount = rowCount * colCount;
let cellSize = (100/rowCount) + "%";

let color;







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







// CREATE BUTTON-EVENT LISTENERS


// Black Button
blackColorBtn.addEventListener('click', function(){
  color = "black";
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
      cells[i].style.border = "1px solid black";
    };
    gridBtn.textContent = "DISABLE GRID";
  }
});







// CREATE MOUSEDON-HOVER EVENT - CHANGE CELL COLOR
let mouseIsDown = false;

window.addEventListener('mousedown', function(event) {
  event.preventDefault();
  mouseIsDown = true;
});
window.addEventListener('mouseup', function() {
  mouseIsDown = false;
});


// create a mouseover + mousedown listener and changes color of single cell 
// based on index & color choice

let cells = document.querySelectorAll('.cells');

let prevIndex = -1;

cells.forEach(function(cell, index){
  (function(i){
    cell.addEventListener('mouseover', function(){
      if(mouseIsDown){
        if(prevIndex !== -1){
          if(color == randomColor){
            generateRandomColor();
          }else {
            cells[i].style.background = color;
          }
        }
      cell.style.background = color;
      prevIndex = i;
    }});
  }(index))
});







