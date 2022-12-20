import { Injectable } from '@angular/core';
import * as Matter from "matter-js";
import {Base} from "../../common/enemies/base";


@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  myEngine:Matter.Engine = Matter.Engine.create();
  myRender:Matter.Render = Matter.Render.create({
    element:document.body,
    engine:this.myEngine,
    options:{
      width:window.innerWidth,
      height:window.innerHeight-67
    }
  })

  myRunner:Matter.Runner = Matter.Runner.create()

  points:number = 0


  wall1:Matter.Body= Matter.Bodies.rectangle(window.innerWidth-500,500,450,10,{isStatic:true})
  wall2:Matter.Body= Matter.Bodies.rectangle(window.innerWidth-650,400,10,100,{isStatic:true})


  place:number = Math.floor(Math.random() * 100)
  enemy:Matter.Body = Matter.Bodies.rectangle(this.myRender.canvas.width-550+this.place,30,50,50,{label:'enemy'})


  boxes:Base[] = []

  friendlies:Base[] = []

  bodiesToBoxes = new Map(new Map(this.boxes.map(e => [e.body, e])))

  createEnemies(time:number,box?:Base){
    setInterval(()=>{
      box = new Base(window.innerWidth-100,this.floor.position.y-50,50,20,10,10)
      Matter.Composite.add(this.myEngine.world,box.body)
      this.boxes.push(box)
      this.bodiesToBoxes.set(box.body,box)
    },time)
  }

  createFriendly(box?:Base){
      box = new Base(250,this.floor.position.y-50,50,20,6,5)
      Matter.Composite.add(this.myEngine.world,box.body)
      this.friendlies.push(box)
      this.bodiesToBoxes.set(box.body,box)

  }

  movePawns(){
    setInterval(()=>{
      this.boxes.forEach(value => {
        Matter.Body.setVelocity(value.body,{x:-5,y:0})
      })
    },800)

    setInterval(()=>{
      this.friendlies.forEach(value => {
        Matter.Body.setVelocity(value.body,{x:5,y:0})
      })
    },1000)
  }


  floor:Matter.Body = Matter.Bodies.rectangle(window.innerWidth/2,window.innerHeight-200,window.innerWidth,55,{isStatic:true,label:'floor',friction:0.01})

  mouse:Matter.Mouse = Matter.Mouse.create(this.myRender.canvas)
  mouseConst:Matter.MouseConstraint = Matter.MouseConstraint.create(this.myEngine,{mouse:this.mouse})

  levelElements:(Matter.Body | Matter.MouseConstraint) [] = [this.wall1,this.wall2,this.enemy,this.floor,this.mouseConst]

  spawn(){
    this.place=Math.floor(Math.random() * 500)

    this.enemy = Matter.Bodies.rectangle(this.myRender.canvas.width-800+this.place,30,100,100,{label:'enemy'})
    Matter.Composite.add(this.myEngine.world,this.enemy)
  }



  constructor() { }
}
