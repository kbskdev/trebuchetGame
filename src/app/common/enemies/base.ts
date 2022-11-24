import * as Matter from "matter-js";


export class Base {
  constructor(x:number,y:number,w:number,h:number,hp:number,mass:number,collisiongroup:number=0) {
    this.body = Matter.Bodies.rectangle(x,y,w,h,{restitution:1,friction:0.04,mass:mass,collisionFilter:{group:collisiongroup},label:'enemySoldier'})
    this.hp = hp
  }
  showHp(){
    console.log(this.hp)
  }
  hp:number
  body:Matter.Body
}
