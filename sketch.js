var monkey,runmonkey,shockedmonkey;
var banana, bimg, bgm;
var obstacle, imob, obg;
var survivaltime=0;
var ground ;
var play=1,end=0;
var gamestate=play;




function preload(){
runmonkey=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
  shockedmonkey=loadAnimation("sprite_0.png");
  bimg=loadImage("banana.png");
  imob=loadImage("obstacle.png");

}
function setup(){
createCanvas(600,600);  
  monkey=createSprite(150,500);
  monkey.addAnimation("running",runmonkey);
  monkey.addAnimation("shocked",shockedmonkey);
  monkey.scale=0.17;
  
  ground=createSprite(300,560,600,20);
  ground.visible=false;
  
  bgm=new Group();
  obg=new Group();
  
}
function draw(){
  
  background("red");
  
  if(gamestate === play){
    
    if(keyDown("space")&& monkey.y>=497){
      monkey.velocityY=-14;
    }
    monkey.velocityY=monkey.velocityY+0.5;
    monkey.collide(ground);
    if(monkey.isTouching(bgm)){
      bgm.destroyEach();
      
    }
    if(monkey.isTouching(obg)){
      gamestate=end;
    }

    spawnbanana();
    object();
    survivaltime=survivaltime+Math.round(getFrameRate()/60);
    
  }
  
  else if(gamestate === end){
    monkey.changeAnimation("shocked");
    bgm.setVelocityXEach(0);
    obg.setVelocityXEach(0);
    bgm.setLifetimeEach(-1);
    obg.setLifetimeEach(-1);
     fill("black");
  textSize(50);
  text("Game Over ",150,400)
  }
  drawSprites();
  fill("black");
  textSize(20);
  text("Survival Time : "+survivaltime,350,200)
}
 
function spawnbanana(){
 if(frameCount%120 === 0) {
   banana=createSprite(600,400);
   banana.y=Math.round(random(300,400));
   banana.addImage(bimg);
   banana.velocityX=-5;
   bgm.add(banana);
   banana.lifetime=120;
   banana.scale=0.1
 }
}

function object(){
 if(frameCount%125 === 0) {
 obstacle=createSprite(600,520);
   obstacle.addImage(imob);
   obstacle.velocityX=-5;
   obg.add(obstacle);
   obstacle.lifetime=120;
   obstacle.scale=0.2  
 }
}