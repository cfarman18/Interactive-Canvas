const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

function drawBaseRects() {
    ctx.fillStyle = 'red';
    for (i = 0; i < 17; i++) {
        ctx.fillRect((64*i), 718, 64, 40);
        ctx.strokeRect((64*i), 718, 64, 40);
    }
}

drawBaseRects();