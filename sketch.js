var sword, fruit, monster, fruitGroup, enemyGroup, score, r, randomFruit, position;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var gameOverSound, knifeSwoosh;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {

  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  knifeSwoosh = loadSound("knifeSwooshSound.mp3")

}

function setup() {
  createCanvas(600, 600);

  //creating sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7



  //set collider for sword
  sword.setCollider("rectangle", 0, 0, 40, 40);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();

}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    //Call fruits and Enemy function
    fruits();
    Enemy();




    // Move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSwoosh.play();
      score = score + 2;
    }
    if (enemyGroup.isTouching(sword)) {
      gameState = END;
    }

  } else if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    sword.addImage(gameOverImage);
    sword.x = 300;
    sword.y = 300;
    sword.scale = 1.5;
    //   gameOverSound.play();
  }


  text("Score : " + score, 300, 30);

  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruit.velocityX = -(8 + score / 10);
    fruitGroup.add(fruit);
  }

}

function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;
    monster.velocityX = -(8 + (score / 10));
    enemyGroup.add(monster);
  }
}