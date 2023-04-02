import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpotPriceService } from '../services/spot-price.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-rare-metals',
  templateUrl: './rare-metals.component.html',
  styleUrls: ['./rare-metals.component.scss'],
  providers: [CurrencyPipe]
})
export class RareMetalsComponent implements OnInit {
  goldPricePerOunce = 0;
  silverPricePerKilo = 0;
  goldAmountOunces = 0;
  silverAmountKilos = 0;
  totalValue = 0;
  totalBuyIn = 0;
  rareMetalsForm: FormGroup;
  totalBuyInForm: FormGroup;


  ngOnInit() {
    this.getLatestSpotPrices();
    this.getLatestBuyIn();
    this.fetchAmounts();
  }

  constructor(private spotPriceService: SpotPriceService, private fb: FormBuilder, public currencyPipe: CurrencyPipe) {
    this.rareMetalsForm = this.fb.group({
      goldPricePerOunce: [0],
      silverPricePerKilo: [0],
      goldAmountOunces: [0],
      silverAmountKilos: [0]
    });
    this.totalBuyInForm = this.fb.group({
      totalBuyIn: [0]
    });

   }

  onRefreshSpotPrices() {
    this.spotPriceService.getSpotPrices().subscribe((response: any) => {
      const goldRate = response.rates.XAU;
      const silverRate = response.rates.XAG;
  
      const goldPricePerOunce = 1 / goldRate; // Calculate the cost of 1 ounce of gold in dollars
      const silverPricePerKilo = (1 / silverRate) * 35.27396; // Calculate the cost of 1 kg of silver in dollars
  
      this.spotPriceService.storeSpotPricesInFirestore(goldPricePerOunce, silverPricePerKilo)
        .then(() => {
          this.getLatestSpotPrices();
          console.log('Spot prices stored in Firestore');
        })
        .catch(error => {
          console.error('Error storing spot prices in Firestore:', error);
        });
    });
  }

  getLatestSpotPrices() {
    this.spotPriceService.getLatestSpotPricesFromFirestore().subscribe((prices: any[]) => {
      if (prices.length > 0) {
        const latestPrices = prices[0];
        this.goldPricePerOunce = latestPrices.gold;
        this.silverPricePerKilo = latestPrices.silver;
        this.rareMetalsForm.patchValue({
          goldPricePerOunce: this.goldPricePerOunce,
          silverPricePerKilo: this.silverPricePerKilo
        });
        this.calculateTotalValue();
      }
    });
  }

  getLatestBuyIn() {
    this.spotPriceService.getStoredTotalBuyIn().subscribe((buyIn: any) => {
      if (buyIn) {
        this.totalBuyIn = buyIn.totalBuyIn;
        this.totalBuyInForm.patchValue({
          totalBuyIn: this.totalBuyIn
        });
        }
      });
  }

  fetchAmounts() {
    this.spotPriceService.getStoredAmounts().subscribe(amounts => {
      if (amounts) {
        this.goldAmountOunces = amounts.goldAmount || 0;
        this.silverAmountKilos = amounts.silverAmount || 0;
        this.rareMetalsForm.patchValue({
          goldAmountOunces: this.goldAmountOunces,
          silverAmountKilos: this.silverAmountKilos
        });
        setTimeout(() => {
          this.calculateTotalValue();
        }, 0);
      }
    });
  }

  onSubmit() {
    const goldAmountOunces = this.rareMetalsForm.value.goldAmountOunces;
    const silverAmountKilos = this.rareMetalsForm.value.silverAmountKilos;

    this.spotPriceService.storeGoldAndSilverAmounts(goldAmountOunces, silverAmountKilos)
      .then(() => {
        console.log('Gold and silver amounts stored in Firestore');
      })
      .catch(error => {
        console.error('Error storing gold and silver amounts in Firestore:', error);
      });
  }

  onSubmitBuyIn() {
    this.totalBuyIn = this.totalBuyInForm.value.totalBuyIn;
    this.spotPriceService.storeTotalBuyIn(this.totalBuyIn).then(() => {
      console.log('Total buy in stored in Firestore');
    });
  }

  calculateTotalValue() {  
    this.totalValue = (this.goldAmountOunces * this.goldPricePerOunce) + (this.silverAmountKilos * this.silverPricePerKilo);
  }

}
