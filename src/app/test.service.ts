import { Oculus } from './oculus';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, observable, of, empty } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrl = "http://192.168.100.10:9098/api/oculus/all"; // "https://api.github.com/search/repositories";
  public searchResults: any;

  constructor(private httpClient: HttpClient) { }

  // public searchEntries(term): Observable<any>{
  //   if (term === "" ){
  //     console.log("Not defined");
  //     return of(null);
  //     //return empty();
  //   }else{
  //     let params = {q: term }
  //     return this.httpClient.get(this.baseUrl, {params}).pipe(
  //       map(response => {
  //         console.log(response)
  //         return this.searchResults = response["items"];
  //       })
  //     );
  //   }
  //  }

   public getOculus(): Observable<Oculus[]> {
     return this.httpClient.get<Oculus[]>(this.baseUrl);
   }

   //returns the response for the first method
  // public _searchEntries(term): any{
  //   return this.searchEntries(term);
  // }
}
