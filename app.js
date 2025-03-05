const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', () => { drawing = true; });

// Stop drawing when mouse is released
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });

// Draw on the canvas when the mouse moves
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 5; // Pen size
    ctx.lineCap = 'round'; // Smooth edges
    ctx.strokeStyle = 'black'; // Pen color

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save the drawing to the gallery
function saveDrawing() {
    const dataUrl = canvas.toDataURL();
    let drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    drawings.push({ image: dataUrl });
    localStorage.setItem('drawings', JSON.stringify(drawings));
    alert('Drawing saved!');
}

// Display saved drawings
function showGallery() {
    let drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    let galleryHtml = '<h2>Gallery</h2>';
    drawings.forEach((drawing, index) => {
        galleryHtml += `<img src="${drawing.image}" alt="Drawing ${index + 1}" style="max-width: 300px; margin: 10px; border: 1px solid #ddd;">`;
    });
    const newWindow = window.open();
    newWindow.document.write(galleryHtml);
    newWindow.document.close();
}
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentChallenge = '';

const challenges = [
    { name: 'Beer Goggles', effect: 'zoom' },
    { name: 'Earthquake', effect: 'shake' },
    { name: 'Magnified', effect: 'largePen' },
    { name: 'Inverted', effect: 'inverted' },
    { name: 'Mirror', effect: 'mirror' },
    { name: 'Invisible Pen', effect: 'invisible' }
];

function getRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    currentChallenge = challenges[randomIndex];
    document.getElementById('challenge').textContent = currentChallenge.name;

    // Apply canvas effect
    canvas.className = currentChallenge.effect;
}

canvas.addEventListener('mousedown', () => { drawing = true; });
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;

    let brushColor = 'black';
    let brushSize = 5;

    if (currentChallenge.effect === 'invisible') brushColor = 'white';
    if (currentChallenge.effect === 'largePen') brushSize = 20;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;

    if (currentChallenge.effect === 'inverted') {
        x = canvas.width - x;
        y = canvas.height - y;
    }

    if (currentChallenge.effect === 'mirror') {
        x = canvas.width - x;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    const dataUrl = canvas.toDataURL();
    let drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    drawings.push({ image: dataUrl, challenge: currentChallenge.name });
    localStorage.setItem('drawings', JSON.stringify(drawings));
    alert('Drawing saved!');
}

function showGallery() {
    let drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    let galleryHtml = '<h2>Gallery</h2>';
    drawings.forEach((drawing, index) => {
        galleryHtml += `<p>Challenge: ${drawing.challenge}</p>`;
        galleryHtml += `<img src="${drawing.image}" style="max-width:300px; border:1px solid #ddd; margin:10px;">`;
    });
    const newWindow = window.open();
    newWindow.document.write(galleryHtml);
    newWindow.document.close();
}

// Add styles for effects
const style = document.createElement('style');
style.innerHTML = `
    .zoom { transform: scale(2); }
    .shake { animation: shake 0.5s infinite; }
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);

