import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() modalContent!: TemplateRef<any>;
  @Output() confirmEvent = new EventEmitter();

  onClose() {
    this.confirmEvent.emit(false);
  }

  onConfirm() {
    this.confirmEvent.emit(true);
  }
}