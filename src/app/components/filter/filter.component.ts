import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  animations: [
    trigger('toggleVisibility', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden <=> visible', [animate('300ms ease-in-out')])
    ])
  ]
})
export class FilterComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';
  @Input() placeholder: string = 'Select';
  @Output() optionSelected = new EventEmitter<string>();
  showOptions: boolean = false;

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  selectOption(option: string): void {
    this.optionSelected.emit(option);
    this.selectedOption = option;
    this.showOptions = false;
  }
}
