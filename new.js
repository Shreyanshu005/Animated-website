const canvas=document.querySelector('canvas');

const c=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

console.log(c);

class player{
    constructor(){
      this.posittion={x:100,y:100}
    this.width=100;
    this.height=100;
}
draw(){
   
    c.fillRect(this.posittion.x,this.posittion.y,this.width,this.height);
}
}

const player1=new player();
player1.draw();