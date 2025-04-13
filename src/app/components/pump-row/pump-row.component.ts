import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from "../button/button.component";
import { Pump } from '../../models/pump.model';


@Component({
  selector: 'app-pump-row',
  standalone: true,
  templateUrl: './pump-row.component.html',
  styleUrls: ['./pump-row.component.scss'],
  imports: [ButtonComponent, RouterModule]
})
export class PumpRowComponent {
  @Input() pump!: Pump;
  @Output() statusChanged = new EventEmitter<number>();
  changePumpStatus(id: number): void {
    this.statusChanged.emit(id);
  }

}
