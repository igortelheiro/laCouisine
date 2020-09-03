import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() modalTitle: string;
  @Input() modalBodyText: string;
  @Input() modalCloseButtonText: string;
  @Input() modalConfirmButtonText: string;

  @Output() closeModal = new EventEmitter();
  @Output() confirmModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onCloseModal() {
    this.closeModal.emit();
  }


  onConfirmModal() {
    this.confirmModal.emit();
  }

}
