import { Component, OnInit } from '@angular/core';
import * as Matter from 'matter-js'

@Component({
  selector: 'app-main-level',
  templateUrl: './main-level.component.html',
  styleUrls: ['./main-level.component.css']
})
export class MainLevelComponent implements OnInit {

  constructor() { }
  myEngine:Matter.Engine = Matter.Engine.create();
  myRender:Matter.Render = Matter.Render.create({
    element:document.body,
    engine:this.myEngine,
    options:{
      width:500,
      height:500
    }
  })
  myRunner:Matter.Runner = Matter.Runner.create()

  box:Matter.Body = Matter.Bodies.rectangle(30,30,30,30)
  floor:Matter.Body = Matter.Bodies.rectangle(250,450,500,10,{isStatic:true})

  mouse:Matter.Mouse = Matter.Mouse.create(this.myRender.canvas)
  mouseConst:Matter.MouseConstraint = Matter.MouseConstraint.create(this.myEngine,{mouse:this.mouse})

  title = 'trebuchetGame';

  ngOnInit() {
    Matter.Render.run(this.myRender)
    Matter.Runner.run(this.myRunner,this.myEngine)
    Matter.Composite.add(this.myEngine.world,[this.box,this.floor,this.mouseConst])
  }
}
