const video = document.getElementById('videoElement');
const canvas = document.getElementById('maskCanvas');
const ctx = canvas.getContext('2d');
const spots = document.querySelectorAll('.video-spot');

function resizeCanvas() {
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
}

function drawMask() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    spots.forEach(spot => {
        const textRect = spot.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const textWidth = textRect.width;

        const margin = 100;

        const x = textRect.right - canvasRect.left + margin;

        const remainingWidth = canvas.width - x; 
        const spotWidth = remainingWidth > 0 ? remainingWidth : 0; 
        const spotHeight = textRect.height + 20; 

        ctx.clearRect(x, textRect.top + textRect.height / 2 - canvasRect.top - spotHeight / 2, spotWidth, spotHeight); 
    });
}

video.addEventListener('loadeddata', () => {
    resizeCanvas();
    drawMask();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    drawMask();
});

video.addEventListener('play', () => {
    setInterval(drawMask, 100);
});
