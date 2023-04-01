import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RareMetalsComponent } from './rare-metals/rare-metals.component';
import { PropertiesComponent } from './properties/properties.component';
import { IncomeComponent } from './income/income.component';
import { StocksComponent } from './stocks/stocks.component';
import { SavingsComponent } from './savings/savings.component';
import { RentalCarsComponent } from './rental-cars/rental-cars.component';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    RareMetalsComponent,
    PropertiesComponent,
    IncomeComponent,
    StocksComponent,
    SavingsComponent,
    RentalCarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
