import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import axios from 'axios';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  stocks: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    // this.firestoreService.getData('stocks').subscribe((data) => {
    //   this.stocks = data;
    // });
    this.fetchStockData();
  }

  async fetchStockData() {
    // Replace with the API URL and necessary parameters
    const apiUrl = 'https://api.example.com/stocks';

    try {
      const response = await axios.get(apiUrl);
      const stockData = response.data;

      // Store the fetched data in Firebase
      // this.firestoreService.addData('stocks', stockData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  }
}