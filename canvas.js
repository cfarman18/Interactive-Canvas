const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

/* 
Javascript code for canvas project
Working title: Give Them Life
By Conor Farman 
*/

var isInitialStartup = 1
function drawBackground() { /*draws the background using random triangles*/
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1024, 768);
    for (i = 0; i < 26; i++) {
        if (isInitialStartup == 1) {
            var randomShade = getRndInteger(20, 60);
            ctx.fillStyle = `rgb(
            ${randomShade},
            ${randomShade},
            ${randomShade}
            )`;
        } else {
            ctx.fillStyle = `rgb(
            ${getRndInteger(20, 60)},
            ${getRndInteger(20, 60)},
            ${getRndInteger(20, 60)}
            )`;
        }
        ctx.beginPath();
        ctx.moveTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.lineTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.lineTo(getRndInteger(0, 1024),getRndInteger(0, 768));
        ctx.fill();
    }
    isInitialStartup = 0
}

function theBackgroundLives() { /*background changes when screen clicked enough times*/
//    ctx.fillStyle = `rgb(
//            ${getRndInteger(0, 255)},
//            ${getRndInteger(0, 255)},
//            ${getRndInteger(0, 255)}
//        )`;
//    ctx.fillRect(0, 0, 1024, 768);
    for (i = 0; i < 25; i++) {
        ctx.fillStyle = `rgb(
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)},
            ${getRndInteger(0, 255)}
        )`;
        function makeTheCircles() {
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
                currentRad = 1;
            }
        setTimeout(makeTheCircles, 100)
        }
}

var life = 0;
var loops = 0;
var ignoreTriangles = 0;
function giveLife() { /*the interactive element*/
    if (life > 15) { // when clicked 16 times, numbers of loops increases
        life = 0;
        loops++;
        if (ignoreTriangles == 0){
            drawBackground()
        }
    }
    var lifeColourA = (16*(life+1));
    var lifeColourB = (16/(life+1));
    if (loops < 1) { // determines colours based on the current number of clicks as determined by the 'life' variable
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
    if (ignoreTriangles == 0){
        ctx.beginPath();
        ctx.arc(event.offsetX, event.offsetY, 50, 0, Math.PI * 2);
        ctx.fill() // draws a circle at the mouse's position
    }
    life++;
    if (loops == 3) { // after 3 loops, the background drastically changes
        loops = 0;
        ignoreTriangles = 1;
        theBackgroundLives()
    }
}

function getRndInteger(min, max) { /*used for generating random numbers on demand*/
  return Math.floor(Math.random() * (max - min) ) + min;
}

drawBackground();

addEventListener('click', giveLife);