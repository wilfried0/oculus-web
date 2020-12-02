import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";
import { Oculus } from '../oculus';
//import { SearchService } from "../search.service";
import { TestService } from "../test.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public loading: boolean;
  public searchTerm = new Subject<string>();
  public baseUrl = "http://192.168.100.10:9098/api/oculus/all";  // "https://api.github.com/search/repositories";// ;
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page:any;
  oculusList: Oculus[] = [];
  oculusListTemp: Oculus[] = [];
  search: string;
  ville: string = "Ville";
  incident: string = "Incident";
  selectedLevel;

  constructor(
    private searchService: TestService,
    private router: Router
  ) { }

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.loadOculus();
  }

  selected(){
    console.log(this.selectedLevel);
  }

  loadOculus(): void {
    this.searchService.getOculus().subscribe(data => {
      this.oculusList = data;
      this.oculusListTemp = data;
    });
  }

  details(oculus: Oculus): void {
    this.router.navigate(['incident/details/' + oculus.id]);
    localStorage.setItem('oculus', JSON.stringify(oculus));
  }

  onOculusChanged(event): void {
    this.search = event.target.value.toLowerCase();
    let result: Oculus[] = [];
    this.oculusList = this.oculusListTemp;
    this.ville = "Ville";
    this.incident = "Incident";
    result = this.oculusList.filter(oculus => {
      if (oculus.incident ? oculus.incident.toLowerCase().includes(this.search) : false) {
        return oculus;
      } else if (oculus.description ? oculus.description.toLowerCase().includes(this.search) : false ) {
        return oculus;
      } else if (oculus.ville ? oculus.ville.toLowerCase().includes(this.search) : false ) {
        return oculus;
      } else if (oculus.created_at ? oculus.created_at.toLowerCase().includes(this.search) : false ) {
        return oculus;
      }
    });
    if(this.search === '') {
      this.loadOculus();
    } else {
      this.oculusList = result;
    }
    console.log(this.oculusList)
  }

  onTownChange(value: any): void{
     this.ville = value.toLowerCase();
     this.incident = this.incident.toLowerCase();
     let result: Oculus[] = [];
     this.search = null;
     //this.oculusList = this.oculusListTemp;
     result = this.oculusListTemp.filter(oculus => {
      if (this.incident !="Incident" && oculus.incident.toLowerCase().includes(this.incident) && oculus.ville.toLowerCase().includes(this.ville)) {
        console.log("on est dans ville 1!");
        return oculus;
      } else if (oculus.ville.toLowerCase().includes(this.ville)) {
        console.log("on est dans ville 2!");
        return oculus;
      }
    });
    this.oculusList = result;
    console.log(this.oculusList)
  }

  onIncidenceChange(value: any){
    this.incident = value.toLowerCase();
    this.ville = this.ville.toLowerCase();
    let result: Oculus[] = [];
    this.search = null;
    //this.oculusList = this.oculusListTemp;
    result = this.oculusListTemp.filter(oculus => {
      if (this.ville !="Ville" && oculus.ville.toLowerCase().includes(this.ville) && oculus.ville.toLowerCase().includes(this.incident)) {
        console.log("on est dans ville 1!");
        return oculus;
      } else if (oculus.incident.toLowerCase().includes(this.incident)) {
        console.log("on est dans ville 2!");
        return oculus;
      }
    });
    this.oculusList = result;
    console.log(this.oculusList)
  }

}
