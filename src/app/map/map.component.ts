import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat:number = 3.8830779;
  long:number = 11.5385686;

  constructor() { }

  ngOnInit(): void {
  }

}
