const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

function drawBaseRects(rectColour) { /*draws rects at the base of the screen*/
    ctx.fillStyle = rectColour;
    for (i = 0; i < 17; i++) {
        ctx.fillRect((64*i), 728, 64, 40);
    }
}

//function drawBounceRects(rectColour) { /*draws interactive rects*/
//    ctx.fillStyle = rectColour;
//    for (i = 0; i < 17; i++) {
//        ctx.fillRect((64*i), 708, 64, 20);
//    }
//} Originally meant for a second layer at base, might reimplement

function drawBackground() { /*draws the background using random triangles*/
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1024, 768);
    for (i = 0; i < 26; i++) {
        var randomShade = getRndInteger(20, 60);
        ctx.fillStyle = `rgb(
            ${randomShade},
            ${randomShade},
            ${randomShade}
        )`;
        ctx.beginPath();
        ctx.moveTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.lineTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.lineTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.fill();
    }
}

function theBackgroundLives() { /*background changes when screen clicked enough times*/
    ctx.fillStyle = `rgb(
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)}
        )`;
    ctx.fillRect(0, 0, 1024, 768);
    for (i = 0; i < 50; i++) {
        ctx.fillStyle = `rgb(
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)}
        )`;
        var circleRad = getRndInteger(75, 200);
        var currentRad = 1;
        var circleX = getRndInteger(0, 1024);
        var circleY = getRndInteger(0, 768);
                function genCircle() {
                    ctx.beginPath();
                    ctx.arc(circleX, circleY, currentRad, 0, Math.PI * 2);
                    ctx.fill();
                    currentRad++;
                        if (currentRad <= circleRad) {
                            setTimeout(genCircle, 100);
                        }
                    }
                genCircle();
            }
        }

var life = 0;
var loops = 0;
function giveLife() { /*the interactive element*/
    if (life > 16) {
        life = 0;
        loops++;
    }
    var lifeColourA = (16*(life+1));
    var lifeColourB = (16/(life+1));
    if (loops < 1) {
        ctx.fillStyle = `rgb(
            ${lifeColourA},
            ${lifeColourB},
            ${125}
        )`;
    } else if (loops < 2) {
        ctx.fillStyle = `rgb(
            ${125},
            ${lifeColourA},
            ${lifeColourB}
        )`;
    } else {
        ctx.fillStyle = `rgb(
            ${lifeColourB},
            ${125},
            ${lifeColourA}
        )`;
    }
    ctx.fillRect((64*life), event.offsetY, 64, 20);
    life++;
    if (loops == 3) {
        loops = 0;
        theBackgroundLives()
    }
}

function getRndInteger(min, max) { /*used for generating random numbers on demand*/
  return Math.floor(Math.random() * (max - min) ) + min;
}

drawBackground();
drawBaseRects('rgb(200,200,200)');
//drawBounceRects('rgb(240,240,240)');
theBackgroundLives() //debug

addEventListener('click', giveLife);