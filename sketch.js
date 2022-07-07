var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_over;
var grass, invisibleGround, grassImage;

var obstaclesGroup, moto_bug, spikes, bomb

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverimg, restartimg
var gameOver, restart




function preload(){
  sonic_running = loadAnimation("./sonic1.png","./sonic2.png");
    gameOverimg = loadImage ("./game_over.png");
  //restartimg = loadImage ("restart.png");
  grassImage = loadImage("./grass.jpg");
  
  
  obstacle1 = loadImage("./bomb.png");
  obstacle2 = loadImage("./moto_bug.png");
  obstacle3 = loadImage("./spikes.png");

  
  }

function setup() {
  createCanvas(600, 200);
  
  sonic = createSprite(50,180,20,50);
  sonic.addAnimation("running", sonic_running);
  sonic.addImage("collided", gameOverimg);
  sonic.scale = 0.5;
  sonic.setCollider ("circle", 0, 0, 50)
  
  
  grass = createSprite(200,180,400,20);
  grass.addImage("grass",grassImage);
  grass.x = grass.width /2;
  grass.velocityX = -4;



  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group(); 
  
  score = 0;
}


function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
    
  
  if(gameState === PLAY){
    grass.velocityX = -(4+3*score/100);
    if(score>0&&score % 100 === 0){
      
    }
    
    if(keyDown("space")&& sonic.y >= 150) {
      sonic.velocityY = -13;
            }
    
    sonic.velocityY = sonic.velocityY + 0.8
    
    if (grass.x < 0){
      grass.x = grass.width/2;
    }
    
   

    
    
    spawnObstacles();
    if (obstaclesGroup.isTouching (sonic))
        {gameState = END
      die.play()
    }
    
    score = score + Math.round(getFrameRate()/60);
  }
  else if(gameState === END){
    grass.velocityX = 0;
    obstaclesGroup.setVelocityXEach (0)
    sonic.velocityY = 0
    gameOver.visible = true
    restart.visible = true
    obstaclesGroup.setLifetimeEach (-1)
    sonic.changeAnimation ("collided", game_over)
   
    

    }
    sonic.collide(invisibleGround);
    drawSprites();

  }

  
    
  
  
 


function reset()
{
gameState = PLAY
sonic.changeAnimation ("running" ,sonic_running)
obstaclesGroup.destroyEach()
score = 0
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/100);

   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(moto_bug);
              break;
      case 2: obstacle.addImage(bomb);
              break;
      case 3: obstacle.addImage(spikes);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   obstaclesGroup.add(obstacle);
 }
}




