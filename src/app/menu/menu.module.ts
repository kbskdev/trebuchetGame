import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from "./main-page/main-page.component";
import { MenuNavbarComponent } from './menu-navbar/menu-navbar.component';
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    MenuNavbarComponent
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
