import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { FormsModule } from '@angular/forms';

import { PumpRowComponent } from '../pump-row/pump-row.component';
import { FilterComponent } from '../filter/filter.component';
import { CreatePumpModalComponent } from '../create-pump-modal/create-pump-modal.component';

import { Pump } from '../../models/pump.model';

@Component({
  selector: 'app-main',
  imports: [CommonModule, PumpRowComponent, FilterComponent, FormsModule, CreatePumpModalComponent],
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
  filteredPumps: Pump[] = [];
  status: string[] = [];
  selectedArea: string = '';
  selectedStatus: string = '';
  searchQuery: string = '';
  showAreas: boolean = false;
  showStatus: boolean = false;
  showCreatePumpModal: boolean = false;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.mockupData$.subscribe((data:any) => {
      this.areas = data?.areas;
      this.pumps = this.filteredPumps = data?.pumpsInitialData;
      this.status = data?.status;
    });
  }
  updateFilteredPumps(): void {
    this.filteredPumps = this.pumps?.filter((pump: Pump) => {
      return (
        (this.selectedArea ? pump.area === this.selectedArea : true) &&
        (this.selectedStatus ? pump.status === this.selectedStatus : true) &&
        (this.searchQuery && this.searchQuery.length > 2 ? pump.number.includes(this.searchQuery) : true)
      );
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
    this.updateFilteredPumps();
  }
  changePumpStatus(id: number): void {
    const pump = this.pumps.find(p => p.id === id);
    if (pump) {
      pump.status = pump.status === 'active' ? 'inactive' : 'active';
      this.updateFilteredPumps();
    }
  }
  onSearchQueryChange(): void {
    this.updateFilteredPumps();
  }
  onCreatePump(): void {
    this.showCreatePumpModal = true;
    console.log('Create new pump button clicked!');
  }
  addPump(newPump: Pump): void {
    newPump.id = this.pumps.length + 1;
    this.pumps.push(newPump); // Add the new pump to the list
    this.updateFilteredPumps(); // Update the filtered list
  }

  closeModal(): void {
    this.showCreatePumpModal = false; // Close the modal
  }

}
