var monkey , monkey_running;
var food, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score=0;
var survivalTime=0;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  monkey = createSprite(80,315);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.debug=false
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
}

function draw() {
 background("white")
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
  if(keyDown("space")&& monkey.y >= 200){
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
   food();
   Obstacles();
  
  
  if(obstaclesGroup.isTouching(monkey))
  {
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    ground.velocityX=0;
  }
  
  monkey.collide(ground);
  
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time "+survivalTime, 100, 50);
}
 function food() {
   if (frameCount % 80 === 0) {
    var food = createSprite(600, 120);
    food.y=Math.round(random(120, 200));
    food.addImage(bananaImage)
    food.scale = 0.1;
    food.velocityX = -3;
    food.lifetime=600;
    FoodGroup.add(food);
   }
 }

 function Obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX = -(6 + score/100);
   obstacle.lifetime=600;
   obstaclesGroup.add(obstacle);
   obstacle.debug=false
 }
}