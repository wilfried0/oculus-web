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
  search: string = '';
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

  LoadOculusByTownAndIncident(ville: string, incident: string): void {
    this.oculusList = this.oculusListTemp.filter(oculus => {
      if(oculus.incident.toLowerCase().includes(incident) && oculus.ville.toLowerCase().includes(ville)) {
        return oculus;
      }
    });
    this.search = '';
  }

  onTownChange(value: any): void{
     this.ville = value;
     let incident = this.incident.toLowerCase();
     this.search = null;
     if(incident === "incident") {
      incident = "";
     }
     this.LoadOculusByTownAndIncident(this.ville.toLowerCase(), incident);
  }

  onIncidenceChange(value: any){
     this.incident = value;
     let ville = this.ville.toLowerCase();
     this.search = null;
     if(ville === "ville") {
      ville = "";
     }
     this.LoadOculusByTownAndIncident(ville, this.incident.toLowerCase());
  }

}
