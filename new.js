const platformimg = new Image();
platformimg.src = './Seasonal Tilesets/1 - Grassland/Background parts/4.png';
const walkR=new Image();
walkR.src='assets/right.png';
const idleR=new Image();
idleR.src='assets/fox.png';

// const backroundimg = new Image();
// backroundimg.src = './Seasonal Tilesets/1 - Grassland/Background parts/background_glacial_mountains.png';


const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function drawText() {
  c.font = '25px Comic Sans MS';
  c.fillStyle = 'black';
  c.fillText('Use W A S D for controls!', 10, 30);
}

console.log(c);
const gravity = 1.5;
class player {
  constructor() {
    this.position = { x: 100, y: 100 }
    this.velocity = { x: 0, y:0 }
    this.width = 173;
    this.height = 153;
this.image=createImg(idleR);
this.frames=0;
  }
  draw() {
    // c.fillStyle = 'red';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image,173*this.frames,0,173,159,
       this.position.x, this.position.y+25,this.width,this.height)
       

  }
  update() {
    this.frames++;
    if(this.frames>9){
      this.frames=0}
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    // else this.velocity.y = 0;


  };
}

class Platform {
  constructor({ x, y, image }) {
    this.position = { x, y }

    this.width = image.width;
    this.height = image.height - 100;
    this.image = image;
    console.log(image.width);

  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

}

class Objects {
  constructor({ x, y, image }) {
    this.position = { x, y }

    this.width = image.width;
    this.height = image.height - 100;
    this.image = image;
    console.log(image.width);

  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }

}
function createImg(imageSrc){
  const image = new Image();
  image.src = imageSrc.src;
  return image;
}

let platimg=createImg(platformimg);



let player1 = new player();
let platforms = [new Platform({ x: -1, y: 630, image:platformimg }), new Platform({ x: platformimg.width+200, y: 630, image:platformimg }), new Platform({ x: platformimg.width*2+500, y: 630, image:platformimg }),
  new Platform({ x: platformimg.width*3+790, y: 630, image:platformimg }),new Platform({ x: platformimg.width*4+1000, y: 630, image:platformimg }),new Platform({ x: platformimg.width*5+1250, y: 630, image:platformimg }),new Platform({ x: platformimg.width*6+1250, y: 630, image:platformimg }),new Platform({ x: platformimg.width*6+1250, y: 440, image:platformimg })];
let objs = [new Objects({ x: -1000, y: -1000,image:createImg(platformimg) })];

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrolloff = 0;

function init(){



 platimg=createImg(platformimg);



 player1 = new player();
 platforms = [new Platform({ x: -1, y: 630, image:platformimg }), new Platform({ x: platformimg.width+200, y: 630, image:platformimg }), new Platform({ x: platformimg.width*2+500, y: 630, image:platformimg }),
  new Platform({ x: platformimg.width*3+790, y: 630, image:platformimg }),new Platform({ x: platformimg.width*4+1000, y: 630, image:platformimg }),new Platform({ x: platformimg.width*5+1250, y: 630, image:platformimg }),new Platform({ x: platformimg.width*6+1250, y: 630, image:platformimg }),new Platform({ x: platformimg.width*6+1250, y: 440, image:platformimg })];
 objs = [new Objects({ x: -1000, y: -1000,image:createImg(platformimg) })];



 scrolloff = 0;
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  objs.forEach(obj => {obj.draw();})
  platforms.forEach(platform => {
    platform.draw();
  })
  player1.update();
  drawText();

  if (keys.right.pressed && player1.position.x <= 400) {
    player1.velocity.x = Math.min(player1.velocity.x + 5, 10);

  } else if ((keys.left.pressed && player1.position.x >= 100)||keys.left.pressed && scrolloff===0&&player1.position.x>0) {
    player1.velocity.x = Math.max(player1.velocity.x - 5, -10);
  }
  else {
    player1.velocity.x = 0;

    if (keys.right.pressed) {
      scrolloff += 5
      platforms.forEach(platform => {

        platform.position.x -= 10;

      })

    } else if (keys.left.pressed&&scrolloff>0) {
      scrolloff -= 5;
      platforms.forEach(platform => {

        platform.position.x += 10;


      }

      )

    }

  };
  console.log(scrolloff);
  platforms.forEach(platform => {
    if (player1.position.y + player1.height <= platform.position.y && player1.position.y + player1.height + player1.velocity.y >= platform.position.y && player1.position.x + player1.width >= platform.position.x && player1.position.x <= platform.position.x + platform.width) {
      player1.velocity.y = 0;
      // player1.position.y = platform.position.y - player1.height;


    
    }
  })
  if (scrolloff >= 2000) {
    console.log('game over');
  }
  if(player1.position.y>=canvas.height){
    init();
  }
}
animate();


document.addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 87:
      
    if (player1.velocity.y === 0) {
      player1.velocity.y -= 25;
    }
      break;

    case 68:
      keys.right.pressed = true;
      break;

    case 65:
      keys.left.pressed = true;
      break;
  }
});
document.addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
  

    case 68:
      keys.right.pressed = false;
      break;

    case 65:
      keys.left.pressed = false;
      break;
  }
});