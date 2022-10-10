var PLAY = 0;
var END = 1;
var gameState = PLAY;

var runner, runnerImg;
var track, trackImg;

var bombs, bombImg, bombG;
var cones, coneImg, coneG;
var swords, swordImg, swordG;

var coins, coinImg, coinG;

var rightEdge, leftEdge;

var Coins = 0;
var distance = 0;

var gameOver, gameOverImg;
var dieSound, coinCollected;


function preload(){

    //Load images
  runnerImg = loadAnimation("Runner-1.png", "Runner-2.png");
  trackImg = loadImage("path.png");

  bombImg = loadImage("bomb.png");
  coneImg = loadImage("cone.png");
  swordImg = loadImage("sword.png");
  coinImg = loadImage("coin.png");
  gameOverImg = loadImage("gameOver.png");

  dieSound = loadSound("die.mp3");
  coinCollected = loadSound("Coin.mp3");


}

function setup() {
 createCanvas(450, 600);

 //adding images

 runner = createSprite(225, 550);
 runner.addAnimation("running", runnerImg);
 runner.scale = 0.07;
 

 track = createSprite(225, 300);
 track.addImage(trackImg);
 track.velocityY = 5;
 track.scale = 1.3;

 runner.depth = track.depth;
 runner.depth += 1;

 leftEdge=createSprite(0,550,100,1000);
 leftEdge.visible = false;

rightEdge=createSprite(450,550,80,1000);
rightEdge.visible = false;

//track.visible = false;
//runner.setCollider("rectangle", -30, 30, 100, 100);
//runner.debug = true;

gameOver=createSprite(225, 300);
gameOver.addImage("Game Over", gameOverImg);
gameOver.visible = false;

bombG = new Group();
coneG = new Group();
swordG = new Group();
coinG = new Group();

} 

function draw() {
 background(0)

  drawSprites();

 if(gameState===PLAY){


  runner.x = World.mouseX
  distance = distance + Math.round(getFrameRate()/50);
  track.velocityY = (6 + 2*distance/150);
  
  if(track.y > 600 ){
    track.y = height/2;
  }

   runner.collide(leftEdge);
   runner.collide(rightEdge);

   var select_things = Math.round(random(1,4));

  if(frameCount % 100 == 0){

   if(select_things == 1){
   createBombs();
   }
   else if(select_things == 2){
   createCones();
   }
   else if(select_things == 3){
   createSwords();
   }
   else{
   createCoins();
   }

  }

  if(bombG.isTouching(runner)){
    gameState = END;
    bombG.destroyEach();
    dieSound.play();
  }
  if(coneG.isTouching(runner)){
    gameState = END;
    coneG.destroyEach();
    dieSound.play();
  }
  if(swordG.isTouching(runner)){
    gameState = END;
    swordG.destroyEach();
    dieSound.play();
  }
  if(coinG.isTouching(runner)){
   Coins = Coins + 1;
   coinG.destroyEach();
   coinCollected.play();
  }
 }

 else if(gameState === END){
  track.velocityY = 0;
  runner.visible = false;
  gameOver.visible = true; 
  bombG.destroyEach();
  coneG.destroyEach();
  swordG.destroyEach();
  coinG.destroyEach();



  if(keyDown("space")) {
    reset();
  }

  textSize(20);
  fill(225);
  text("Press space key to restart the game!", 60,400);
 }


 textSize(18);
 fill(225);
 text("Distance: "+ distance, 60, 30);
 text("Coins: "+Coins, 250, 30)
}

function createBombs(){
  bombs = createSprite(Math.round(random(95, 370)), -50)
  bombs.scale = 0.15;
  bombs.velocityY = (6 + 2*distance/150);
  bombs.addImage("bombs", bombImg);
  bombG.add(bombs);
  bombG.setLifetimeEach(170);
  //bombs.debug = true;
  bombG.setColliderEach("rectangle", 0, 0, 50, 50);
}

function createCones(){
  cones = createSprite(Math.round(random(90, 370)), -50)
  cones.scale = 0.15;
  cones.velocityY = (6 + 2*distance/150);
  cones.addImage("cones", coneImg);
  coneG.add(cones);
  coneG.setLifetimeEach(170);
  //cones.debug = true;
  coneG.setColliderEach("rectangle", 0, 0, 50, 50);
}

function createSwords(){
  swords = createSprite(Math.round(random(95, 360)), -50)
  swords.scale = 0.15;
  swords.velocityY = (6 + 2*distance/150);
  swords.addImage("swords", swordImg);
  swordG.add(swords);
  swordG.setLifetimeEach(170);
  //swords.debug = true;
  swordG.setColliderEach("rectangle", 0, 0, 50, 50)
}

function createCoins(){
  coins = createSprite(Math.round(random(85, 370 )), -50);
  coins.scale = 0.6;
  coins.velocityY = (6 + 2*distance/150);
  coins.addImage("coins", coinImg);
  coinG.add(coins);
  coinG.setLifetimeEach(170);
  //coins.debug = true;
  coinG.setColliderEach("rectangle", 0, 0, 50, 50);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
 
  bombG.destroyEach();
  coneG.destroyEach();
  swordG.destroyEach();
  coinG.destroyEach();
  
  distance = 0;
  Coins = 0;

  track.velocityY = (6 + 2*distance/150);
  track.scale = 1.3;
  runner.visible = true;
}