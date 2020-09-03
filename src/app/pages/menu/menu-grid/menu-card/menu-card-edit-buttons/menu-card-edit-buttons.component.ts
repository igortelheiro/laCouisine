import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Menu } from '../../../../../models/menu.model';

@Component({
  selector: 'app-menu-card-edit-buttons',
  templateUrl: './menu-card-edit-buttons.component.html',
  styleUrls: ['./menu-card-edit-buttons.component.css']
})
export class MenuCardEditButtonsComponent implements OnInit {
  @Input() btnMode: string;
  @Input() updateForm: FormGroup;
  @Input() menu: Menu;

  @Output() cancelUpdateCard = new EventEmitter();
  @Output() deleteCard = new EventEmitter();
  @Output() switchCardEditMode = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onCancelUpdateCard() {
    this.cancelUpdateCard.emit();
  }

  onDeleteCard() {
    this.deleteCard.emit();
  }


  onSwitchCardEditMode() {
    this.switchCardEditMode.emit();
  }

  isFormDirty() {
    if (this.updateForm.dirty) {
      if (this.updateForm.get('inputTitle').value == this.menu.title)
        return false;
      else
        return true;
    }
    else
      return false;
  }
}
