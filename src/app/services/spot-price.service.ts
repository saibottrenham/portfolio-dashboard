import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotPriceService {
  private apiKey = 'd838e5eaab77855b017eb596750d0eba'; // Replace with your actual API key
  private apiUrl = `https://api.metalpriceapi.com/v1/latest?api_key=${this.apiKey}&base=AUD&currencies=XAU,XAG`;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  getSpotPrices() {
    return this.http.get(this.apiUrl);
  }

  storeSpotPricesInFirestore(gold: number, silver: number) {
    return this.firestore.collection('spot-prices').add({ gold, silver, timestamp: new Date() });
  }

  getLatestSpotPricesFromFirestore() {
    // Assuming your spot prices are stored in a collection named 'spot-prices'
    return this.firestore.collection('spot-prices', ref => ref.orderBy('timestamp', 'desc').limit(1)).valueChanges();
  }

  storeGoldAndSilverAmounts(goldAmountOunces: number, silverAmountKilos: number): Promise<void> {
    return this.firestore.collection('rareMetals').doc('userAmounts').set({
      goldAmountOunces,
      silverAmountKilos
    });
  }

  getStoredAmounts() {
    return this.firestore
      .collection('rareMetals')
      .doc('userAmounts')
      .valueChanges()
      .pipe(
        map((amounts: any) => {
          return {
            goldAmount: amounts.goldAmountOunces,
            silverAmount: amounts.silverAmountKilos,
          };
        })
      );
  }
}