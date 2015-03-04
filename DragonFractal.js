var canvas = document.getElementById("pic");
var context = canvas.getContext("2d");
var iterations, folds, mirror, pos_x, pos_y, dir, last_x, last_y;
var x, y, i;

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

iterations = 16;
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

context.textAlign = "right";
context.textBaseline = "bottom";
context.font = "bold 14px Anonymous Pro";
context.fillText("Iterations: " + iterations, 642, 395);

