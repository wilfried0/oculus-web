import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oculus } from '../oculus';

@Component({
  selector: 'app-oculus-details',
  templateUrl: './oculus-details.component.html',
  styleUrls: ['./oculus-details.component.css']
})
export class OculusDetailsComponent implements OnInit {

  id: number;
  oculus: Oculus = JSON.parse(localStorage.getItem('oculus'));

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.loadOculusById(this.id);
    });
  }

  loadOculusById(id: number): void {
    this.oculus = JSON.parse(localStorage.getItem('oculus'));
  }

}
