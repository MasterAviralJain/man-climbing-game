var area,areaImg,mainStand,mainStandImg,man,manLeftImg,manRightImg,manBlock,standBlock,standImg,manBlock,standGroup,standBlockGroup,outBlock,gameOver,gameOverImg,stand;
var PLAY=0;
var END=1;
var gameState=PLAY;
var Score,HI;
function preload(){

  areaImg=loadImage("4062fdb3-c2d1-4df0-a184-87db00473f9f.jpg");
  mainStandImg=loadImage("743e9351-41ff-4251-8fd4-edcaa16108fd.jpg");
  manLeftImg=loadImage("09b51cc3-b58f-4a12-bea2-2a221e5c379d-removebg-preview.png");
  manRightImg=loadImage("deede0fe-fdad-424c-9d2d-f6661a4f4de3-removebg-preview.png");
  StandImg=loadImage("743e9351-41ff-4251-8fd4-edcaa16108fd.jpg");
  gameOverImg=loadImage("d7b81223-7c8d-4693-becc-0249887cd65f-removebg-preview.png")
}


function setup() {

  createCanvas(470,700);

  area= createSprite (235,350,400,600);
  mainStand= createSprite (235, 650, 100, 20);
  man= createSprite (235, 600, 200, 400);
  manBlock=createSprite (235, 650, 10, 5);
  outBlock=createSprite (235, 650, 10, 5);
  gameOver=createSprite(235,350);

  area.addImage(areaImg);
  mainStand.addImage(mainStandImg);
  man.addImage(manLeftImg);
  gameOver.addImage(gameOverImg);

  area.scale=3;
  mainStand.scale=0.3;
  man.scale=0.25;
  gameOver.scale=0.7;

  
  gameOver.visible=false;

 manBlock.visible=false;
outBlock.visible=false;
  standGroup=createGroup();
  standBlockGroup=createGroup();
man.debug=false;

mainStand.setLifetime=150;

score=0;
HI=0;
}


function draw() {
  background(0);  
  drawSprites();
  textSize=50;
  fill('blue');
  text("Score = "+score,400,50);
text("HI = "+HI,400,20);

if(score>=HI){
  HI=score;
}

  if(area.y>500){
    area.y = area.height/2;
  }

if (manBlock.collide(standBlockGroup)){
  man.collide(standBlockGroup);
  manBlock.velocityY=0;
}

if(gameState===PLAY){
  if(keyDown("space")&&man.collide(mainStand)){
    man.velocityY=-3;  
    mainStand.destroy() 
    manBlock.velocityY=-3;         
  }
  area.velocityY=(3+score/120);
  
  score=score + Math.round(getFrameRate()/60);
  if(keyDown("space")&&man.collide(standBlockGroup)){
    man.velocityY=-3;  
    mainStand.destroy() 
    manBlock.velocityY=-3;         
  }
  if(keyWentDown(RIGHT_ARROW)){
    man.addImage(manRightImg);
    man.scale=0.35;
    man.velocityX=3
    manBlock.velocityX=3;
    man.setCollider("rectangle",0,60,110,150)
    }
    if(keyWentUp(RIGHT_ARROW)){
      
      man.velocityX=0
      manBlock.velocityX=0;
      }
  
    if(keyWentDown(LEFT_ARROW)){
      man.addImage(manLeftImg);
      man.scale=0.25;
      man.velocityX=-3
      manBlock.velocityX=-3;
      man.setCollider("rectangle",0,70,150,230)
    }
    if(keyWentUp(LEFT_ARROW)){
      
      man.velocityX=0
      manBlock.velocityX=0;
    
      }
  
    if(World.frameCount%70===0){
      stands();
    }

    if(outBlock.collide(standBlockGroup)){
      gameState=END;
    }

}

    if(gameState===END){
      gameOver.visible=true;
      man.velocityY=0;
      man.velocityX=0;
      area.velocityY=0;
      //stand.velocityY=0;
     // standBlock.velocityY=0;
    }
  
  
  man.velocityY=man.velocityY+0.07;
  /*if(man.collide(mainStand)||manBlock.collide(standBlockGroup)){
    man.velocityY=0;
    manBlock.velocityY=0;
  }*/

  man.collide(mainStand);
  man.x=manBlock.x;
  manBlock.y=man.y+55;
  manBlock.velocityY=manBlock.velocityY+0.06;
  outBlock.x= man.x
  outBlock.y=man.y-55;
  man.collide(standBlockGroup);
manBlock.collide(standBlockGroup)
 

 
}


function stands(){
let stand=createSprite(random(70,400), -10, 70, 10);
standBlock=createSprite(stand.x, stand.y, 120, 2);

stand.addImage(StandImg);
stand.scale=0.25;

stand.velocityY=(3+score/120);
standBlock.velocityY=stand.velocityY;

stand.lifetime=710*stand.velocity;

standBlock.visible=false;

standGroup.add(stand);
standBlockGroup.add(standBlock);


}