import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError } from "rxjs/operators";
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
  public baseUrl = "https://api.github.com/search/repositories";// "http://192.168.100.10:9098/api/oculus/all";
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page:any;

  constructor(private searchService: TestService) { }

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search(){
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return null;//this.searchService._searchEntries(term)
      }),
      catchError((e) => {
        //handle the error and return it
        console.log(e)
        this.loading = false;
        this.errorMessage = e.message;
        return throwError(e);
      }),
    ).subscribe(v => {
        this.loading = false;
        //return the results and pass the to the paginate module
        this.searchResults = v;
        this.paginationElements = this.searchResults;
    })
  }

  ngOnInit(): void {
    this.search();
  }
}
