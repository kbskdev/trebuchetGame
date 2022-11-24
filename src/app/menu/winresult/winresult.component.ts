import { Component, OnInit } from '@angular/core';
import {TrebuchetService} from "../../level/trebuchet/trebuchet.service";

@Component({
  selector: 'app-winresult',
  templateUrl: './winresult.component.html',
  styleUrls: ['./winresult.component.css']
})
export class WinresultComponent implements OnInit {

  constructor(public points:TrebuchetService) { }

  ngOnInit(): void {
  }

}
