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

  loadOculus(): void {
    this.searchService.getOculus().subscribe(data => {
      this.oculusList = data;
    });
  }

  details(oculus: Oculus): void {
    this.router.navigate(['incident/details/' + oculus.id]);
    localStorage.setItem('oculus', JSON.stringify(oculus));
  }

  onOculusChanged(event): void {
    const search = event.target.value.toLowerCase();
    let result: Oculus[] = [];
    result = this.oculusList.filter(oculus => {
      if (oculus.incident ? oculus.incident.toLowerCase().includes(search) : false) {
        return oculus;
      } else if (oculus.description ? oculus.description.toLowerCase().includes(search) : false ) {
        return oculus;
      } else if (oculus.ville ? oculus.ville.toLowerCase().includes(search) : false ) {
        return oculus;
      }
    });
    if(search === '') {
      this.loadOculus();
    } else {
      this.oculusList = result;
    }
    console.log(this.oculusList)
  }

}
