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

  box:Matter.Body = Matter.Bodies.rectangle(1600,30,100,100,{label:'enemy'})
  floor:Matter.Body = Matter.Bodies.rectangle(window.innerWidth/2,window.innerHeight-200,window.innerWidth,15,{isStatic:true})

  mouse:Matter.Mouse = Matter.Mouse.create(this.myRender.canvas)
  mouseConst:Matter.MouseConstraint = Matter.MouseConstraint.create(this.myEngine,{mouse:this.mouse})

  constructor() { }
}
