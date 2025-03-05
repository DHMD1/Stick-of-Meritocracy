
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
