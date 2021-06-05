var dogI,dog, dog1,happyDog, database, foodS, foodStock;

function preload()
{
  dogI = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,25,25);
  dog.addImage(dogI);
  dog.scale=0.5;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
 background(46,139,87);



 
  drawSprites();
  textSize(20);
  fill("red");
  stroke("pink");
  strokeWeight(4);
  text("Press UP_ARROW to feed the dog.",20,20)
  text("foods: "+foodS,300,50)
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }

  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
function keyPressed(){
   if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    console.log(foodS);
   }
   
}