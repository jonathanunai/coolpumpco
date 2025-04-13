import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from "../button/button.component";

import { Pump } from '../../models/pump.model';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-pump-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './pump-details.component.html',
  styleUrls: ['./pump-details.component.scss']
})
export class PumpDetailsComponent implements OnInit {
  pump!: Pump | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const pumpId = Number(this.route.snapshot.paramMap.get('id'));
    this.sharedDataService.mockupData$.subscribe((data) => {
      this.pump = data?.pumpsInitialData.find((p: Pump) => p.id === pumpId);
    });
  }
  deletePump(): void {
    if (this.pump) {
      this.sharedDataService.deletePump(this.pump.id);
      this.router.navigate(['/']);
    }
  }

}
