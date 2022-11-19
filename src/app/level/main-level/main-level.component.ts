import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import * as Matter from 'matter-js'
import {LoaderService} from "../loader/loader.service";
import {TrebuchetService} from "../trebuchet/trebuchet.service";

@Component({
  selector: 'app-main-level',
  templateUrl: './main-level.component.html',
  styleUrls: ['./main-level.component.css']
})
export class MainLevelComponent implements OnInit, OnDestroy {

  constructor(private level:LoaderService, private trebuchet:TrebuchetService) { }

  title = 'trebuchetGame';




  @HostListener('window:click', ['$event'])
  shoot(event:MouseEvent){
    this.trebuchet.releaseAmmo()
  }

  @HostListener('window:contextmenu', ['$event'])
  release(event:MouseEvent){
    this.trebuchet.releaseWeight()
  }

  @HostListener('window:keydown.space')
  reload(){
    this.trebuchet.reload()
  }

  ngOnInit() {
    Matter.Render.run(this.level.myRender)
    Matter.Runner.run(this.level.myRunner,this.level.myEngine)
    this.level.levelElements.forEach(value => {
      Matter.Composite.add(this.level.myEngine.world,value)
    })
    this.trebuchet.trebuchet.forEach(value => {
      Matter.Composite.add(this.level.myEngine.world,value)
    })

    this.trebuchet.trebuchetConstraints.forEach(value => {
      Matter.Composite.add(this.level.myEngine.world,value)
    })

    Matter.Events.on(this.level.myEngine,'collisionActive',(event)=>{
      event.pairs.forEach(value => {
        if((value.bodyA.label=='ammo' && value.bodyB.label=='enemy')||(value.bodyB.label=='ammo' && value.bodyA.label=='enemy')){
          Matter.World.remove(this.level.myEngine.world,this.level.box)
          this.level.spawn()
          setTimeout(()=>{Matter.World.remove(this.level.myEngine.world,this.trebuchet.trebuchetAmmo)},500)
        }
      })
    })

    // Matter.Events.on(this.level.myEngine,'collisionStart',(event)=>{
    //   console.log(event.pairs)
    //   if(event.pairs[0].bodyB.label=='enemy' && event.pairs[0].bodyA.label=='ammo'){
    //     Matter.World.remove(this.level.myEngine.world,this.level.box)
    //
    //     console.log('siur')
    //   }
    // })
  }

  ngOnDestroy() {
    Matter.Render.stop(this.level.myRender); // this only stop renderer but not destroy canvas
    Matter.World.clear(this.level.myEngine.world,false);
    Matter.Engine.clear(this.level.myEngine);
    this.level.myRender.canvas.remove();
    this.level.myRender.textures = {};

  }
}

