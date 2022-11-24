import { Component} from '@angular/core';
import {LoaderService} from "./level/loader/loader.service";
import {TrebuchetService} from "./level/trebuchet/trebuchet.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(public level:LoaderService, public trebuchet:TrebuchetService) {
  }

}
