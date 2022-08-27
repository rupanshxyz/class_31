const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg;
var ground;
var cannon;
var cannon_ball;
var balls = [];
var myboat;

function preload() {
  backgroundImg = loadImage("../C27-Ta-v4--main/assets/background.gif");
}

function setup() {
  createCanvas(1000, 600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(120, 350, 200, 300);
  ground = new Ground(500, 580, width, 20);
  cannon = new Cannon(180, 100, 110, 50, -PI / 4);
  myboat = new boat(width-100, height - 130, 200, 200);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);

  tower.display();

  cannon.display();
  ground.display();
  myboat.display()
  // cannon_ball.display();

  Matter.Body.setVelocity(myboat.body,{x:-5,y:0})

  for (var i = 0; i < balls.length; i += 1) {
    showCannonBalls(balls[i], i);
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannon_ball = new CannonBall(cannon.x, cannon.y, 50, 50);
    balls.push(cannon_ball);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 100) {
    World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}
