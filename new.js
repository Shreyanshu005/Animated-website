const platformimg = new Image();
platformimg.src = './Seasonal Tilesets/1 - Grassland/Background parts/2.png';

// const backroundimg = new Image();
// backroundimg.src = './Seasonal Tilesets/1 - Grassland/Background parts/background_glacial_mountains.png';


const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(c);
const gravity = 1.5;
class player {
  constructor() {
    this.position = { x: 100, y: 100 }
    this.velocity = { x: 0, y: 0 }
    this.width = 30;
    this.height = 30;

  }
  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
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
function init(){
  
}

const platimg=createImg(platformimg);



const player1 = new player();
const platforms = [new Platform({ x: -1, y: 750, image:platformimg }), new Platform({ x: platformimg.width - 2, y: 750, image:platformimg }), new Platform({ x: platformimg.width*2+100, y: 750, image:platformimg })];
const objs = [new Objects({ x: -1000, y: -1000,image:createImg(platformimg) })];

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrolloff = 0;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  objs.forEach(obj => {obj.draw();})
  platforms.forEach(platform => {
    platform.draw();
  })
  player1.update();

  if (keys.right.pressed && player1.position.x <= 400) {
    player1.velocity.x += 5;

  } else if (keys.left.pressed && player1.position.x >= 100) {
    player1.velocity.x -= 5;
  }
  else {
    player1.velocity.x = 0;

    if (keys.right.pressed) {
      scrolloff += 5
      platforms.forEach(platform => {

        platform.position.x -= 5;

      })

    } else if (keys.left.pressed) {
      scrolloff -= 5;
      platforms.forEach(platform => {

        platform.position.x += 5;


      }

      )

    }

  };
  console.log(scrolloff);
  platforms.forEach(platform => {
    if (player1.position.y + player1.height <= platform.position.y && player1.position.y + player1.height + player1.velocity.y >= platform.position.y && player1.position.x + player1.width >= platform.position.x && player1.position.x <= platform.position.x + platform.width) {
      player1.velocity.y = 0;

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
      player1.velocity.y -= 15;
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
    case 87:
      player1.velocity.y -= 15;
      break;

    case 68:
      keys.right.pressed = false;
      break;

    case 65:
      keys.left.pressed = false;
      break;
  }
});