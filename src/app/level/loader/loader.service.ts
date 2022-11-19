import { Injectable } from '@angular/core';
import * as Matter from "matter-js";

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

  place:number = Math.floor(Math.random() * 500)

  box:Matter.Body = Matter.Bodies.rectangle(this.myRender.canvas.width-800+this.place,30,100,100,{label:'enemy'})
  floor:Matter.Body = Matter.Bodies.rectangle(window.innerWidth/2,window.innerHeight-200,window.innerWidth,55,{isStatic:true,label:'floor'})

  mouse:Matter.Mouse = Matter.Mouse.create(this.myRender.canvas)
  mouseConst:Matter.MouseConstraint = Matter.MouseConstraint.create(this.myEngine,{mouse:this.mouse})

  levelElements:(Matter.Body | Matter.MouseConstraint) [] = [this.box,this.floor,this.floor,this.mouseConst]

  spawn(){
    this.place=Math.floor(Math.random() * 500)

    this.box = Matter.Bodies.rectangle(this.myRender.canvas.width-800+this.place,30,100,100,{label:'enemy'})
    Matter.Composite.add(this.myEngine.world,this.box)
  }

  constructor() { }
}
