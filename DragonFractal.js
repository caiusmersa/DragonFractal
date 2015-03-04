var canvas = document.getElementById("pic");
var context = canvas.getContext("2d");
var gradient;
var iterations, folds, mirror, pos_x, pos_y, dir, last_x, last_y;
var x, y, i;

function createGradient(color) {
  console.log(color);
  gradient = context.createLinearGradient(375, 125, 647, 0);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, color);
}
createGradient("olive");   //Default grad. color

function render() {
  //Draw the background gradient
  context.fillStyle = gradient;
  context.fillRect(300, 0, 647, 400);

  //Draw the background grid
  for (x = 1; x < 647; x += 10) {
    context.moveTo(x, 0);
    context.lineTo(x, 400);
  }

  for (y = 1; y < 400; y += 10) {
    context.moveTo(0, y);
    context.lineTo(647, y);
  }

  context.strokeStyle = "#eee";
  context.stroke();

  //Draw the dragon curve
  iterations = 15;
  folds = "R";
  for (i = 1; i < iterations; i++) {
    mirror = "";
    for (x = folds.length - 1; x >= 0; x--) {
      mirror += folds[x] === "R" ? "L" : "R";
    }
    folds = folds + "R" + mirror;
    console.log(folds);
  }

  context.beginPath();
  pos_x = 300;
  pos_y = 200;
  dir = 3;
  for (i = 0; i < folds.length; i++) {
    dir = ((folds[i] === "R" ? (dir - 1) : (dir + 1)) + 4) % 4;
    context.moveTo(pos_x, pos_y);
    if (dir % 2 === 0) {
      pos_x += (dir - 1) * 2;
    } else {
      pos_y += (dir - 2) * 2;
    }

    context.lineTo(pos_x, pos_y);
  }

  context.strokeStyle = "#000";
  context.stroke();

  //Draw the misc. text
  context.textAlign = "right";
  context.textBaseline = "bottom";
  context.font = "bold 17px Anonymous Pro";
  context.fillStyle = "#000";
  context.fillText("Iterations: " + iterations, 642, 395);
}
render();

function randomGradient() {
  var rand = Math.random();
  if (rand > 0.66) {
    createGradient("maroon");
  } else if (rand > 0.33) {
    createGradient("navy");
  } else {
    createGradient("olive");
  }
  render();
}
canvas.addEventListener("click", randomGradient, false);

