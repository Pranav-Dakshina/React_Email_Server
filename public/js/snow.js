
const rainCanvas = document.getElementById("rain");
const ctxRain = rainCanvas.getContext("2d");
const rainCount = 500;
const rainArray = [];
let w, h;

const init = () => {
  w = rainCanvas.width = window.innerWidth;
  h = rainCanvas.height = window.innerHeight;
  window.addEventListener("resize", onResizeHandler);
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.framerate = 60;
  populateRain();
};

const random = (min, max) => {
  return min + Math.random() * (max - min + 1);
};

const onResizeHandler = ev => {
  w = rainCanvas.width = window.innerWidth;
  h = rainCanvas.height = window.innerHeight;
};

const populateRain = () => {
  for (var i = 0; i < rainCount; i++) {
    // var element = array[i];
    rainArray.push({
      x: Math.random() * w * 1.2, // can go offscreen
      y: Math.random() * h,
      width: random(1, 1),
      length: Math.random() * 2,
      opacity: random(0.1, 0.3),
      speedX: random(-1, -2),
      speedY: random(0.5, 1.5)
    });
  }
};

// Gravity at work
const moveRaindrops = () => {
  let i = 0;
  for (i = 0; i < rainArray.length; i++) {
    let raindrop = rainArray[i];
    raindrop.x += raindrop.speedX;
    raindrop.y += raindrop.speedY;
    if (raindrop.y > h) {
      raindrop.x = Math.random() * w * 1.2;
      raindrop.y = -20;
    }
  }
};
const drawRaindrops = () => {
  let i = 0;
  for (i = 0; i < rainArray.length; i++) {
    const raindrop = rainArray[i];
    const startpoint = { x: raindrop.x, y: raindrop.y };
    const endpoint = {
      x: raindrop.x + raindrop.speedX * raindrop.length,
      y: raindrop.y + raindrop.speedY * raindrop.length
    };
    const grad = ctxRain.createLinearGradient(
      startpoint.x,
      startpoint.y,
      endpoint.x,
      endpoint.y
    );
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(1, "rgba(255,255,255," + raindrop.opacity + ")");

    ctxRain.beginPath();
    ctxRain.moveTo(startpoint.x, startpoint.y);
    ctxRain.lineTo(endpoint.x, endpoint.y);
    ctxRain.strokeStyle = grad;
    ctxRain.lineWidth = raindrop.width;
    ctxRain.lineCap = "round";
    ctxRain.stroke();
  }
};

// Control the Canvas
const updateRain = () => {
  ctxRain.clearRect(0, 0, w, h); // clear canvas
  moveRaindrops();
  drawRaindrops();
};

// The Ticker Function
const handleTick = ev => {
  if (!ev.paused) {
    updateRain();
  }
};

init();
