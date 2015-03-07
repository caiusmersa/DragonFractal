//Other stuff to experiment with:
//--Canvas shadows (see Mihai Sucan)

var canvas = document.getElementById("pic");
var it_slider = document.getElementById("it_slider");
var context = canvas.getContext("2d");
var gradient;
var iterations = 14, folds, mirror, pos_x, pos_y, dir, last_x, last_y;
var x, y, i;

function createGradient(color) {
  console.log(color);
  gradient = context.createLinearGradient(600, 50, 1370, 500);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, color);
}
createGradient("navy");   //Default grad. color

function render() {
  //Draw the background gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, 970, 600);

  //Draw the background grid
  for (x = 1; x < 970; x += 10) {
    context.moveTo(x, 0);
    context.lineTo(x, 600);
  }

  for (y = 1; y < 600; y += 10) {
    context.moveTo(0, y);
    context.lineTo(970, y);
  }

  context.strokeStyle = "#C6CBDE";
  context.stroke();

  //Draw the dragon curve
  folds = iterations > 0 ? "R" : "";
  for (i = 2; i <= iterations; i++) {
    mirror = "";
    for (x = folds.length - 1; x >= 0; x--) {
      mirror += folds[x] === "R" ? "L" : "R";
    }
    folds = folds + "R" + mirror;
    console.log(folds);
  }

  var lineLen = iterations >= 10 ? iterations >= 15 ? 1 : 4 : iterations >= 7 ? 9 : 30;
  context.beginPath();
  pos_x = iterations < 15 ? 700 : 200;
  pos_y = iterations < 15 ? 350 : 250;
  context.moveTo(pos_x, pos_y);
  pos_y += lineLen;
  context.lineTo(pos_x, pos_y);
  dir = 3;
  for (i = 0; i < folds.length; i++) {
    dir = ((folds[i] === "R" ? (dir - 1) : (dir + 1)) + 4) % 4;
    context.moveTo(pos_x, pos_y);
    if (dir % 2 === 0) {
      pos_x += (dir - 1) * lineLen;
    } else {
      pos_y += (dir - 2) * lineLen;
    }

    context.lineTo(pos_x, pos_y);
  }

  context.strokeStyle = "#000";
  context.stroke();

  //Draw the misc. text
  context.textAlign = "right";
  context.textBaseline = "bottom";
  context.font = "bold 20px Anonymous Pro";
  context.fillStyle = "#000";
  context.fillText("iterations: " + iterations, 965, 595);
  context.fillText(Math.pow(2, iterations) + (iterations > 0 ? " segments" : " segment") + " of pixel length " + lineLen, 965, 570);
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

function changeIterations() {
  iterations = it_slider.value;
  render();
}
it_slider.addEventListener("keyup", changeIterations, false);
it_slider.addEventListener("change", changeIterations, false);

