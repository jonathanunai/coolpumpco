import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  footerLinks: any[] = [];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.sharedDataService.footerLinks$.subscribe((links) => {
      this.footerLinks = links;
    });
  }

}
