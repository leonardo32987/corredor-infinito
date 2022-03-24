var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gary, gary_running, gary_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;
var gameOverImg;
var restartImg;
var jumpSound , dieSound

function preload(){
  gary_running = loadImage("gary.png");
  gary_collided = loadAnimation("gary_collided.png");
  
  groundImage = loadImage("ground.jpg");
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
 
  
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")

  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
}

function setup() {
  createCanvas(800,500);

  
  gary = createSprite(50,160,20,50);
  gary.addImage("running", gary_running);
  gary.addAnimation("collided", gary_collided);
  

  gary.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();

  
  gary.setCollider("circle",0,0,40);
  gary.debug = false
  
  score = 0;
  
}

function draw() {
  
  background(3, 144, 255 );
  
  text("Puntuación: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(frameCount/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& gary.y >= 100) {
        gary.velocityY = -12;
        jumpSound.play();
    }
    
    
    gary.velocityY = gary.velocityY + 0.8
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(gary)){
      
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    
      gary.changeAnimation("collided", gary_collided);
    
     
     
      ground.velocityX = 0;
      gary.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);    
     
     obstaclesGroup.setVelocityXEach(0);
  
   }
  
 
 
  gary.collide(invisibleGround);
  
  if(keydown("space")) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  if(keyDown("space")&& gary.y >= 100) {
    gary.velocityY = -12;
    jumpSound.play();

  }
obstaclesGroup.destroyEach();
score = 0
gary.changeAnimation("running", gary_running);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(7 + score/100);
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
         
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}


