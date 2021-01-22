//Create variables here
var dog, happydog;
var database;
var foodS;
var foodStock;
var lastFed;

function preload()
{
  DogImg1 = loadImage("images/dogImg.png");
  DogImg2 = loadImage("images/dogImg1.png");
  MilkImg = loadImage("images/Milk copy.png");
}

function setup() {
  createCanvas(800, 550);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  Dog = createSprite(475,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;

  feed = createButton("Feed Drago");
  feed.position(650,200);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,250);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(31, 196, 118);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  greetDrago = createButton("Greet Drago!!")
  greetDrago.position(650,300);
  //greetDrago.mousePressed(text("Hi Drago!! How are you",400,300));
  greetDrago.mousePressed(Message);
 
  drawSprites();

  //fill(238, 241, 18);
  //noStroke();
  //textSize(30);
  //text("Food Remaining: " + foodS,50,265);
  //add styles here

  fill(241, 18, 165);
  stroke(241, 18, 165);
  //TOP LINE
  ellipse(65,50,70,70);
  ellipse(200,50,70,70);
  ellipse(335,50,70,70);
  ellipse(470,50,70,70);
  ellipse(600,50,70,70);
  ellipse(735,50,70,70);

  //BOTTOM LINE
  ellipse(65,490,70,70);
  ellipse(200,490,70,70);
  ellipse(335,490,70,70);
  ellipse(470,490,70,70);
  ellipse(600,490,70,70);
  ellipse(735,490,70,70);

  //Creating Rectangles Around The Buttons
  fill(236, 130, 23);
  stroke(236, 130, 23);
  rect(608,160,100,33);
  rect(608,210,88,33);
  rect(609,260,107,33);


  fill(206, 0, 9);
  noStroke();
  textSize(30);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 380,140);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",380,140);
   }else{
     text("Last Fed : "+ lastFed + " AM", 380,140);
   }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  Dog.addImage(DogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  Dog.addImage(DogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function Message(){
  mssg = createElement("h3");
  mssg.html("Hi Drago! How are you?");
  mssg.position(600,350);
}
  //rgb(7, 46, 129)