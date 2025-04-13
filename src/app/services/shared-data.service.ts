import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pump } from '../models/pump.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private filteredListSubject = new BehaviorSubject<Pump[]>([]);
  private pagesSubject = new BehaviorSubject<number>(1);
  private footerLinksSubject = new BehaviorSubject<any[]>([]);

  private originaList: Pump[] = [];
  private pageSize = 5;

  public companyName: string = '';
  public areas: string[] = [];
  public status: string[] = [];
  public footerLinks: [] = [];
  public page: number = 1;
  public pages: number = 1;


  filteredList$ = this.filteredListSubject.asObservable();
  pages$ = this.pagesSubject.asObservable();
  footerLinks$ = this.footerLinksSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadInitialData(): void {
    this.http.get<any>('/assets/data.json').subscribe((data) => {
      this.originaList = data.pumpsInitialData;
      this.areas = data.areas;
      this.status = data.status;
      this.footerLinksSubject.next(data.footerLinks || []);
      this.pages = Math.ceil(this.originaList.length / this.pageSize);
      this.pagesSubject.next(this.pages);
      this.filterData({}, 1)
    });
  }

  filterData(filters: { area?: string; status?: string; searchQuery?: string }, page: number = 1): void {
    this.page = page;
    const { area, status, searchQuery } = filters;
    const filtered = this.originaList.filter((pump) => {
      return (
        (!area || pump.area === area) &&
        (!status || pump.status === status) &&
        (!searchQuery || pump.number.includes(searchQuery))
      );
    });
    const start = (page - 1) * this.pageSize;
    const paginated = filtered.slice(start, start + this.pageSize);
    this.pages = Math.ceil(filtered.length / this.pageSize);
    this.pagesSubject.next(this.pages);

    this.filteredListSubject.next(paginated);
  }

  deletePump(pumpId: number): void {
    this.originaList = this.originaList.filter((pump: Pump) => pump.id !== pumpId);
    this.filterData({}, 1);
  }
  addPump(newPump: Pump): void {
    this.originaList = [...this.originaList, newPump];
    this.filterData({}, 1);
  }
}
