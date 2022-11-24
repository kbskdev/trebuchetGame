import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./menu/main-page/main-page.component";
import {MainLevelComponent} from "./level/main-level/main-level.component";
import {WinresultComponent} from "./menu/winresult/winresult.component";
import {LoseresultComponent} from "./menu/loseresult/loseresult.component";


const routes:Routes = [
  {path:'',component:MainPageComponent},
  {path:'menu',component:MainPageComponent},
  {path:'level',component:MainLevelComponent},
  {path:'winresult',component:WinresultComponent},
  {path:'loseresult',component:LoseresultComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
