var sword, swordImage;
var fruit, fruitImage1, fruitImage2, fruitImage3, fruitImage4;
var microbe, microbeImage;
var fruitGroup, microbeGroup;
var s2, overSound,reSound;

var score;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  swordImage = loadImage("sword.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  microbeImage = loadImage("alien1.png", "alien2.png");
  gameOver = loadImage("gameover.png");
  
  s2=loadSound("s2.mp3");
  overSound = loadSound("gameover.mp3");
  reSound=loadSound("restart.mp3");
}

function setup() {
  createCanvas(400, 400);

  score = 0;

  sword = createSprite(200, 200, 101, 0);
  sword.scale = 0.7;

  fruitGroup = createGroup();
  microbeGroup = createGroup();
}

function draw() {
  background("skyblue");

  sword.y = World.mouseY;
  sword.x = World.mouseX;

  fill("black");
  text("Score :" + score, 340, 20);

  if (gameState === PLAY) {

    sword.addImage("abc", swordImage);

    spawnFruit();

    if (sword.isTouching(fruitGroup)) {
      score = score + 2;
      fruitGroup.destroyEach();
      s2.play();
    }

    if (sword.isTouching(microbeGroup)) {
      microbeGroup.destroyEach();
      gameState = END;
      overSound.play();
    }

    // if (fruitGroup.y>400 || fruitroup.x<0) {
    //   score=score-3;
    // }

  } else if (gameState === END) {
    sword.addImage("abc", gameOver)

    fruitGroup.setVelocityYEach(0);
    fruitGroup.setLifetimeEach(-1);

    textSize(15);
    fill("maroon");
    text("Press 'R' to restart", 150, 50);

    if (keyDown("r")) {
      reSound.play();
      gameState = PLAY;
      score = 0;
    }

  }

  drawSprites();
}

function spawnFruit() {
  if (frameCount % 80 === 0) {

    fruit = createSprite(20, -20, 20, 20);
    fruit.scale = 0.2;
    fruit.lifetime = 70;
    fruitGroup.add(fruit);

    rand = Math.round(random(1, 6));


    console.log(rand);

    switch (rand) {
      case 1:
        fruit.addImage("abc", fruitImage1);
        break;

      case 2:
        fruit.addImage("abc", fruitImage2)
        break;

      case 3:
        fruit.addImage("abc", fruitImage3)
        break;

      case 4:
        fruit.addImage("abc", fruitImage4);
        break;

      case 5:
        spawnMicrobes();
        break;

      case 6:
        spawnMicrobes();
        break;

    }

    position = Math.round(random(1, 2))

    switch (position) {
      case 1:
        fruit.x = 410;
        fruit.y = Math.round(random(10, 370));
        fruit.velocityX = -(6 + score / 4);
        break;

      case 2:
        fruit.x = Math.round(random(10, 390));
        fruit.velocityY = 6 + (score / 4);

    }

  }

}

function spawnMicrobes() {
  microbe = createSprite(20, -20, 20, 20);
  microbe.addImage("abc", microbeImage)
  microbe.x = Math.round(random(10, 390));
  microbe.velocityY = 8 + (score / 6);
  microbe.lifetime = 54;
  microbeGroup.add(microbe);
}