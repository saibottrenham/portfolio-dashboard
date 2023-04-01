import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Add data to a specified collection
  addData(collection: string, data: any): Promise<any> {
    return this.firestore.collection(collection).add(data);
  }

  // Get data from a specified collection
  getData(collection: string): Observable<any[]> {
    return this.firestore.collection(collection).valueChanges();
  }
}