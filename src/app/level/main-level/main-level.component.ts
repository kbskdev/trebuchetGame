import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import * as Matter from 'matter-js'
import {LoaderService} from "../loader/loader.service";
import {TrebuchetService} from "../trebuchet/trebuchet.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-main-level',
  templateUrl: './main-level.component.html',
  styleUrls: ['./main-level.component.css']
})
export class MainLevelComponent implements OnInit, OnDestroy {

  constructor(private level:LoaderService, private trebuchet:TrebuchetService,private  router:Router) { }

  title = 'trebuchetGame';


  @HostListener('document:click', ['$event'])
  shoot(event:MouseEvent){
    this.trebuchet.releaseAmmo()
  }
  @HostListener('window:contextmenu', ['$event'])
  release(event:MouseEvent){
    this.trebuchet.releaseWeight()
  }

  @HostListener('window:keydown', ['$event'])
  action(event:KeyboardEvent){
    console.log(event)
    if(event.key=='q'){
      this.level.createFriendly()
      this.trebuchet.shots++
    }
    if(event.key==' '){
      this.trebuchet.reload()
    }
  }

  ngOnInit() {
    Matter.Render.run(this.level.myRender)
    Matter.Runner.run(this.level.myRunner,this.level.myEngine)

    this.level.createEnemies(5000)

    this.level.movePawns()

    this.level.levelElements.forEach(value => {
      Matter.Composite.add(this.level.myEngine.world,value)
    })
    this.trebuchet.trebuchet.forEach(value => {
      Matter.Composite.add(this.level.myEngine.world,value)
    })


    Matter.Events.on(this.level.myEngine,'collisionStart',(event)=>{
      event.pairs.forEach(value => {
        if((value.bodyA.label=='ammo' && value.bodyB.label=='enemy')||(value.bodyB.label=='ammo' && value.bodyA.label=='enemy')){
          Matter.World.remove(this.level.myEngine.world,this.level.enemy)
          setTimeout(()=>{Matter.World.remove(this.level.myEngine.world,this.trebuchet.trebuchetAmmo)},500)
          this.router.navigate(['winresult'])
        }

        if(this.level.bodiesToBoxes.has(value.bodyA)){
          if(value.bodyB.label=='ammo'){
            Matter.Composite.remove(this.level.myEngine.world,value.bodyA)
            setTimeout(()=>{Matter.World.remove(this.level.myEngine.world,this.trebuchet.trebuchetAmmo)},500)
          }
          else if(this.level.bodiesToBoxes.has(value.bodyB)){
            this.level.bodiesToBoxes.get(value.bodyB)!.hp-=2
            this.level.bodiesToBoxes.get(value.bodyA)!.hp-=2
            if(this.level.bodiesToBoxes.get(value.bodyA)!.hp<=0){
              Matter.World.remove(this.level.myEngine.world,this.level.bodiesToBoxes.get(value.bodyA)!.body)
            }
            if(this.level.bodiesToBoxes.get(value.bodyB)!.hp<=0){
              Matter.World.remove(this.level.myEngine.world,this.level.bodiesToBoxes.get(value.bodyB)!.body)
            }
          }
        }
        else if(this.level.bodiesToBoxes.has(value.bodyB)){
          if(value.bodyA.label=='ammo'){
            Matter.Composite.remove(this.level.myEngine.world,value.bodyB)
            setTimeout(()=>{Matter.World.remove(this.level.myEngine.world,this.trebuchet.trebuchetAmmo)},500)
          }
        }

        if((value.bodyA.label=='enemySoldier' || value.bodyB.label=='enemySoldier') && (value.bodyA.label=='trebuchet' || value.bodyB.label=='trebuchet')){
          this.router.navigate(['loseresult'])
        }
      })
    })
  }

  ngOnDestroy() {
    Matter.Render.stop(this.level.myRender); // this only stop renderer but not destroy canvas
    Matter.World.clear(this.level.myEngine.world,false);
    Matter.Engine.clear(this.level.myEngine);
    this.level.myRender.canvas.remove();
    this.level.myRender.textures = {};

  }
}

