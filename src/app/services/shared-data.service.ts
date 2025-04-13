import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pump } from '../models/pump.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private mockupDataSubject = new BehaviorSubject<any>(null);
  mockupData$ = this.mockupDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInitialData(): void {
    this.http.get('/assets/data.json').subscribe((data) => {
      this.mockupDataSubject.next(data);
    });
  }
  deletePump(pumpId: number): void {
    const data = this.mockupDataSubject.getValue();
    if (data) {
      const updatedPumps = data.pumpsInitialData.filter((pump: Pump) => pump.id !== pumpId);
      this.mockupDataSubject.next({ ...data, pumpsInitialData: updatedPumps });
    }
  }

}
