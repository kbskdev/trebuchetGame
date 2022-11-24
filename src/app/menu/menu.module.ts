import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page/main-page.component";
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import {AppRoutingModule} from "../app-routing.module";
import { WinresultComponent } from './winresult/winresult.component';
import { LoseresultComponent } from './loseresult/loseresult.component';


@NgModule({
  declarations: [
    MenuNavbarComponent,
    WinresultComponent,
    LoseresultComponent
  ],
  exports: [
    MenuNavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class MenuModule { }
