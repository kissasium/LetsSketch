const gridContainer = document.getElementById('gridContainer');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');
const gridSizeInput = document.getElementById('gridSize');
const gridSizeDisplay = document.getElementById('gridSizeDisplay');

let currentColor = colorPicker.value;
let isEraser = false;
let gridSize = gridSizeInput.value; // Set default grid size from input

// Update grid size display
gridSizeDisplay.textContent = `${gridSize} x ${gridSize}`;

// Event listeners
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    isEraser = false; // Reset eraser status when color changes
    updateButtonColors(currentColor);
});

eraserButton.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserButton.classList.toggle('active');
    if (isEraser) {
        eraserButton.style.backgroundColor = '#ffa726'; // Eraser active color
        eraserButton.style.color = '#333'; // Dark text for visibility
    } else {
        updateButtonColors(currentColor); // Revert to selected color
    }
});

clearButton.addEventListener('click', clearGrid);
gridSizeInput.addEventListener('input', (e) => {
    gridSize = e.target.value;
    gridSizeDisplay.textContent = `${gridSize} x ${gridSize}`; // Update display
    createGrid(gridSize); // Create a new grid with the new size
});

// Functions
function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.addEventListener('mousedown', () => applyColor(cell));
        cell.addEventListener('mouseenter', (e) => {
            if (e.buttons === 1) applyColor(cell);
        });
        gridContainer.appendChild(cell);
    }
}

function applyColor(cell) {
    cell.style.backgroundColor = isEraser ? '#fff' : currentColor;
}

function clearGrid() {
    document.querySelectorAll('.grid-item').forEach(cell => {
        cell.style.backgroundColor = '#fff';
    });
}

// Update button colors based on the selected color
function updateButtonColors(color) {
    const buttons = document.querySelectorAll('.toolbar button');

    // Check brightness to determine text color
    const brightness = getBrightness(color);
    const textColor = brightness > 150 ? '#000' : '#fff'; // Dark text for lighter colors

    buttons.forEach(button => {
        button.style.backgroundColor = color;
        button.style.color = textColor;
    });
}

// Function to calculate brightness of a color
function getBrightness(color) {
    const rgb = parseInt(color.slice(1), 16); // Convert hex to decimal
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    // Calculate brightness (standard formula)
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Initialize grid
createGrid(gridSize);
updateButtonColors(currentColor); // Initialize button colors
