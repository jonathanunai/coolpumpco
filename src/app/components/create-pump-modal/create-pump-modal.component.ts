import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";

import { Pump } from '../../models/pump.model'; // Import the Pump model

@Component({
  selector: 'app-create-pump-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './create-pump-modal.component.html',
  styleUrls: ['./create-pump-modal.component.scss']
})
export class CreatePumpModalComponent {
  @Output() pumpCreated = new EventEmitter<Pump>(); // Emits the new pump data
  @Output() closeModal = new EventEmitter<void>(); // Emits when the modal is closed

  pump = <Pump>{
    id: 0,
    number: '',
    area: '',
    status: 'active'
  };

  createPump(): void {
    if (this.pump.number && this.pump.area) {
      this.pumpCreated.emit(this.pump); // Emit the new pump data
      this.closeModal.emit(); // Close the modal
    }
  }

  cancel(): void {
    this.closeModal.emit(); // Close the modal without creating a pump
  }
}
