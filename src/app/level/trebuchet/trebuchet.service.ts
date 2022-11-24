import { Injectable } from '@angular/core';
import * as Matter from "matter-js";
import {LoaderService} from "../loader/loader.service";

@Injectable({
  providedIn: 'root'
})
export class TrebuchetService {

  position:number = 200

  trebuchetSupport:Matter.Body = Matter.Bodies.rectangle(this.position,this.level.floor.position.y-175,20,350,{isStatic:true,render:{fillStyle:'transparent',lineWidth:1},collisionFilter:{group:-2},label:'trebuchet'})

  trebuchetArm:Matter.Body = Matter.Bodies.rectangle(this.position-50,this.level.floor.position.y-290,230,30,{angle:-3.1416/4,collisionFilter:{group:-2},label:'trebuchet'})
  trebuchetCounterweight:Matter.Body = Matter.Bodies.circle(this.position+25,this.level.floor.position.y-345,30,{isStatic:true,mass:1000,collisionFilter:{group:-2},label:'trebuchet'})


  trebuchetPivot:Matter.Constraint = Matter.Constraint.create({bodyA:this.trebuchetArm,pointA:{x:50,y:-50},bodyB:this.trebuchetSupport,pointB:{x:0,y:-135},length:0})

  trebuchetAmmo:Matter.Body = Matter.Bodies.circle(this.position-40, this.level.floor.position.y-40,20,{label:'ammo'})
  AmmoToArmConstraint:Matter.Constraint = Matter.Constraint.create({bodyA:this.trebuchetAmmo,bodyB:this.trebuchetArm,pointB:{x:-80,y:80},stiffness:0.01,length:100,damping:0.1})
  AmmoTofloorConstraint:Matter.Constraint = Matter.Constraint.create({bodyA:this.trebuchetAmmo,pointB:{x:this.trebuchetAmmo.position.x,y:this.trebuchetAmmo.position.y}})

  CounterweightToArm:Matter.Constraint = Matter.Constraint.create({bodyA:this.trebuchetArm,pointA:{x:75,y:-75},bodyB:this.trebuchetCounterweight,length:10})


  trebuchet:Matter.Body[] = [this.trebuchetSupport,this.trebuchetAmmo,this.trebuchetArm,this.trebuchetCounterweight]
  trebuchetConstraints:Matter.Constraint[] = [this.CounterweightToArm,this.trebuchetPivot,this.AmmoToArmConstraint]

  shots:number = 0

  loaded:boolean = true;

  releaseAmmo(){
    Matter.World.remove(this.level.myEngine.world,this.AmmoToArmConstraint)
    if(this.loaded==true){
      this.shots++
    }
    this.loaded = false;

  }



  releaseWeight(){
    this.trebuchetCounterweight.isStatic = false;
  }



  reload()
  {
    if(this.loaded==false){
      this.loaded = true
      Matter.World.remove(this.level.myEngine.world,this.trebuchetAmmo)
      this.trebuchetAmmo = Matter.Bodies.circle(this.position-40, this.level.floor.position.y-40,20,{label:'ammo'})

      Matter.Body.set(this.trebuchetCounterweight,'position',{x:this.position+25,y:this.level.floor.position.y-345})

      setTimeout(()=>{
        this.AmmoToArmConstraint = Matter.Constraint.create({bodyA:this.trebuchetAmmo,bodyB:this.trebuchetArm,pointB:{x:-50,y:100},stiffness:0.01,length:100,damping:0.1})
        Matter.Composite.add(this.level.myEngine.world,[this.AmmoToArmConstraint])

      },2000)

      this.trebuchetCounterweight.isStatic = true;

      Matter.Composite.add(this.level.myEngine.world,[this.trebuchetAmmo])

    }
  }


  constructor(private level:LoaderService) {
  }
}
