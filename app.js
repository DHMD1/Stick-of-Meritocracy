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

const challenges = [
    'Beer Goggles (Zoomed-in view)',
    'Earthquake (Shaky canvas)',
    'Magnified (Large pen size)',
    'Inverted (Draws upside down)',
    'Mirror (Mirrored drawing)',
    'Invisible Pen (Drawing is not visible until saved)'
];

function getRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    document.getElementById('challenge').textContent = challenges[randomIndex];
}

function clearCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    const canvas = document.getElementById('drawingCanvas');
    const dataUrl = canvas.toDataURL();
    let drawings = JSON.parse(localStorage.getItem('drawings') || '[]');
    drawings.push({ image: dataUrl, challenge: document.getElementById('challenge').textContent });
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
