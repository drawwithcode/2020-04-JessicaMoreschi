var gui;

let enemy={x:[], y:[], d:[], xIncrease:[], yIncrease:[]};
let amountOfEnemy = 0;

let p1;
let slider1;
let button1;

let clickk=false;         //condizione stop game
let buttonName = "go";

// Create a letiable for your slider
let j;

// Create letiables for tracking position and velocity
let x, y, velX, velY;



function setup() {
  createGui();

  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0, 0);

  p1 = createP("number of enemies:");
  p1.position(50, height-100);

  slider1 = createSlider(0, 10, 5);
  slider1.position(50, height-65);
  slider1.size(110);

  // Create Joystick.
  // The last four optional arguments define minimum and maximum values
  // for the x and y axes; minX, maxX, minY, maxY
  // The default min and max values for all four are -1 and 1.
  j = createJoystick("Joystick", (width/2)-50, height-130, 100, 100, -1, 1, 1, -1);

  // Enemyting position and velocity
  x     = width/2;
  y     = height/2;
  velX  = 0;
  velY  = 0;
}


function draw() {
  background("#242038");
  drawGui();

  amountOfEnemy = slider1.value();    //aggiurna numero nemici con slider

  //scrivi numero nemici
  push()
  textSize(12);
  textFont('Roboto Mono');
  textAlign(CENTER);
  fill("white");
  text(amountOfEnemy, 175, height-51);
  pop()

  // Use Joystick's output to change velocity
  velX += j.valX*5;
  velY += j.valY*5;

  // Draw Joystick's ellipse
  push();
  fill("#7AA0FF");
  strokeWeight(2);
  stroke("#FFFFFF");
  ellipse(x + velX, y + velY, 25);
  pop();

  //button go/stop
  button1 = createButton(buttonName);
  button1.position(190, height-67);
  bgColor = color ('white');
  button1.mouseReleased(go);

  //crea nemici (random ad ogni setup)
  for (let ii = 0; ii < amountOfEnemy; ii++) {
    enemy.x.push(random(0,width));
    enemy.y.push(random(0,height));
    enemy.d.push(25);
    enemy.xIncrease.push(1);
    enemy.yIncrease.push(2.3);
  }

  //display nemici
  push();
  fill("red");
  strokeWeight(2);
  stroke("#FFFFFF");
  for(let s = 0; s < amountOfEnemy; s++){
    ellipse(enemy.x[s], enemy.y[s], enemy.d[s]);
  }
  pop();

  //muovi nemici
  if (clickk==true){
    move();
  }

  //end game
  if(enemy.d[0]==0 &&
    (enemy.d[1]==0 || 1>= amountOfEnemy ) &&
    (enemy.d[2]==0 || 2>= amountOfEnemy ) &&
    (enemy.d[3]==0 || 3>= amountOfEnemy ) &&
    (enemy.d[4]==0 || 4>= amountOfEnemy ) &&
    (enemy.d[5]==0 || 5>= amountOfEnemy ) &&
    (enemy.d[6]==0 || 6>= amountOfEnemy ) &&
    (enemy.d[7]==0 || 7>= amountOfEnemy ) &&
    (enemy.d[8]==0 || 8>= amountOfEnemy ) &&
    (enemy.d[9]==0 || 9>= amountOfEnemy ) ){
      push()
      textSize(24);
      textFont('Roboto Mono');
      textAlign(CENTER);
      fill("white");
      text("CONGRATULATION", width/2, height/2);
      text("click reset to play again", width/2, height/2+40);
      pop()
    }

  }


  //enemy move
  function move() {
    let speed = random() * 2 + 1;

    for (let e = 0; e < enemy.x.length; e++){
      enemy.x[e] += enemy.xIncrease[e] * speed;
      enemy.y[e] += enemy.yIncrease[e] * speed;

      //bounce
      if (enemy.y[e] > height || enemy.y[e] < 0) {
        enemy.yIncrease[e] = -enemy.yIncrease[e];
      }

      if (enemy.x[e] > width || enemy.x[e] < 0) {
        enemy.xIncrease[e] = -enemy.xIncrease[e];
      }

      //fai scoppiare nemico
      if ((( (enemy.x[e] < (x + velX)+50) && (enemy.x[e] > (x + velX)-50) )
      && ((enemy.y[e] < (y + velY)+50) && (enemy.y[e] > (y + velY)-50) ) )){
        enemy.d[e]=0
      }
    }
  }


  //stop/play button
  function go() {
    if (clickk==false){
      clickk=true;
      buttonName = "reset";
    } else if(clickk==true){
      clickk=false;
      buttonName = "go";
      for (let ee = 0; ee < enemy.x.length; ee++){
        enemy.d[ee]=25;
      }
    }
  }


  /// Add these lines below sketch to prevent scrolling on mobile
  function touchMoved() {
    // do some stuff
    return false;
  }
