var balloon, balloonImage1, balloonImage2;
var dataBase, position;
// create database and position variable here

function preload() {
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png", "hotairballoon1.png",
    "hotairballoon1.png", "hotairballoon2.png", "hotairballoon2.png",
    "hotairballoon2.png", "hotairballoon3.png", "hotairballoon3.png", "hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  database = firebase.dataBase();
  createCanvas(1500, 700);

  balloon = createSprite(250, 450, 150, 150);
  if (keyDown(UP_ARROW)) {
    updateHeight(0, -10);
    balloon.addAnimation("hotAirBalloon", balloonImage1);
    balloon.scale = balloon.scale - 0.01;
  }


  textSize(20);
}

function draw() {
  background(bg);

  if (keyDown(LEFT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.velocity.x = -4
  }
  else if (keyDown(RIGHT_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.velocity.x = 4;
  }
  else if (keyDown(UP_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.velocity.y = -4;
  }
  else if (keyDown(DOWN_ARROW)) {
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.velocity.y = 4;
  }
  var balloonPosition = dataBase.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function updateHeight() {
  dataBase.ref('balloonHeight').set({
    'x': height.x + x,
    'y': height.y + y
  })
}
function readHeight(data) {
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError() {
  console.log("Error in writing to the dataBase");
}