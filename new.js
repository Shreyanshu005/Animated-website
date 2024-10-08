const canvas=document.querySelector('canvas');

const c=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

console.log(c);
const gravity=1.5;
class player{
    constructor(){
      this.position={x:100,y:100}
      this.velocity={x:0,y:0}
    this.width=30;
    this.height=30;

}
draw(){
   c.fillStyle='red';
    c.fillRect(this.position.x,this.position.y,this.width,this.height);
}
update(){
  this.draw();
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
    if (this.position.y+this.height+this.velocity.y<=canvas.height)
        this.velocity.y+=gravity;
        else this.velocity.y=0;
    

};}

class Platform{
  constructor({x,y}){
    this.position={x,y}
    
  this.width=200;
  this.height=20;

}
   draw(){
    c.fillStyle='black';
    c.fillRect(this.position.x,this.position.y,this.width,this.height);
   }

}

const player1=new player();
const platforms=[new Platform({x:200,y:600}),new Platform({x:500,y:700})];
const keys={
  right:{
    pressed:false
  },
  left:{
    pressed:false
  }
}
 
let scrolloff=0;

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    player1.update();
    platforms.forEach(platform=>{
      platform.draw();
    })


    if(keys.right.pressed&&player1.position.x<=400){
      player1.velocity.x+=5;
      
    }else if(keys.left.pressed&&player1.position.x>=100){
      player1.velocity.x-=5;
    }
    else{
      player1.velocity.x=0;

      if(keys.right.pressed){
        scrolloff+=5
        platforms.forEach(platform=>{
     
          platform.position.x-=5;
          
        })
        
      }else if(keys.left.pressed){
        scrolloff-= 5;
        platforms.forEach(platform=>{
       
          platform.position.x+=5;
          
          
        }
      
      )
        
      }
      
    };
    console.log(scrolloff);
    platforms.forEach(platform=>{
    if(player1.position.y + player1.height<=platform.position.y && player1.position.y+player1.height+player1.velocity.y>=platform.position.y && player1.position.x+player1.width>=platform.position.x && player1.position.x<=platform.position.x+platform.width){
      player1.velocity.y=0;
    }})
    if(scrolloff>=2000){
      console.log('game over');
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