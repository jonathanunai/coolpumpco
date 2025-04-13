import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { FormsModule } from '@angular/forms';

import { PumpRowComponent } from '../pump-row/pump-row.component';
import { FilterComponent } from '../filter/filter.component';
import { CreatePumpModalComponent } from '../create-pump-modal/create-pump-modal.component';

import { Pump } from '../../models/pump.model';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-main',
  imports: [CommonModule, PumpRowComponent, FilterComponent, FormsModule, CreatePumpModalComponent, ButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [
    trigger('toggleVisibility', [
      state('hideLayer', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('showLayer', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hideLayer <=> showLayer', [animate('300ms ease-in-out')])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  areas: string[] = [];
  pumps: Pump[] = [];
  status: string[] = [];
  selectedArea: string = '';
  selectedStatus: string = '';
  searchQuery: string = '';
  showAreas: boolean = false;
  showStatus: boolean = false;
  showCreatePumpModal: boolean = false;
  page: number = 1;
  pages: number = 1;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.filteredList$.subscribe((data) => {
      this.pumps = data;
      this.page = this.sharedDataService.page;
      this.areas = this.sharedDataService.areas;
      this.status = this.sharedDataService.status;
    });
    this.sharedDataService.pages$.subscribe((pages) => {
      this.pages = pages;
    });

  }

  trackByPumpId(index: number, pump: Pump): number {
    return pump.id;
  }

  selectFilter(field: string, value: string): void {
    if (field === 'area') {
      this.selectedArea = value;
    } else if (field === 'status') {
      this.selectedStatus = value;
    }
    this.showAreas = false;
    this.showStatus = false;
    this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, 1);
  }
  changePumpStatus(id: number): void {
    const pump = this.pumps.find(p => p.id === id);
    if (pump) {
      pump.status = pump.status === 'active' ? 'inactive' : 'active';
      this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, this.page);
    }
  }
  onSearchQueryChange(): void {
    this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, 1);
  }
  onCreatePump(): void {
    this.showCreatePumpModal = true;
  }
  addPump(newPump: Pump): void {
    newPump.id = this.pumps.length + 1;
    this.sharedDataService.addPump(newPump);
    this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, 1);
  }

  closeModal(): void {
    this.showCreatePumpModal = false; // Close the modal
  }
  nextPage(): void {
    this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, this.sharedDataService.page + 1);
  }
  previousPage(): void {
    this.sharedDataService.filterData({area: this.selectedArea, status: this.selectedStatus,  searchQuery: this.searchQuery}, this.sharedDataService.page - 1);
  }

}
