const container = document.getElementById("container");
const resetButton = document.getElementById("reset");
const rainbowButton = document.getElementById("rainbow");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const colorPicker = document.getElementById("color");

let currentColor = "#333333";
let isRainbowMode = false;
let isEraserMode = false;

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = 512 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseover", changeColor);
    square.addEventListener("mousedown", changeColor);
    container.appendChild(square);
  }
}

function changeColor(e) {
  if (e.buttons !== 1 && e.type !== "mousedown") return;

  if (isRainbowMode) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.backgroundColor = "#" + randomColor;
  } else if (isEraserMode) {
    e.target.style.backgroundColor = "";
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}

function resetGrid() {
  let newSize = prompt("Enter the number of squares per side (max 64):");
  newSize = parseInt(newSize);

  if (isNaN(newSize) || newSize < 1 || newSize > 64) {
    alert("Please enter a valid number between 1 and 64.");
    return;
  }

  createGrid(newSize);
}

function toggleRainbowMode() {
  isRainbowMode = !isRainbowMode;
  isEraserMode = false;
  rainbowButton.classList.toggle("active");
  eraserButton.classList.remove("active");
}

function toggleEraserMode() {
  isEraserMode = !isEraserMode;
  isRainbowMode = false;
  eraserButton.classList.toggle("active");
  rainbowButton.classList.remove("active");
}

function clearGrid() {
  const squares = document.querySelectorAll(".grid-square");
  squares.forEach((square) => (square.style.backgroundColor = ""));
}

resetButton.addEventListener("click", resetGrid);
rainbowButton.addEventListener("click", toggleRainbowMode);
eraserButton.addEventListener("click", toggleEraserMode);
clearButton.addEventListener("click", clearGrid);
colorPicker.addEventListener("input", (e) => {
  currentColor = e.target.value;
  isRainbowMode = false;
  isEraserMode = false;
  rainbowButton.classList.remove("active");
  eraserButton.classList.remove("active");
});

// Prevent dragging
container.addEventListener("dragstart", (e) => e.preventDefault());

// Initial grid creation
createGrid(16);
