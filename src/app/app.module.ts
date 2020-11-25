import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OculusDetailsComponent } from './oculus-details/oculus-details.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    OculusDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
     AgmCoreModule.forRoot({
       apiKey: 'AIzaSyDwoVw8HbRtGziC0JUBNGL6dK7TLS_o5EQ'//AIzaSyDwoVw8HbRtGziC0JUBNGL6dK7TLS_o5EQ
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
