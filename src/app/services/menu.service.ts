import { Menu } from '../models/menu.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  editMode: boolean = false;
  editModeChanges = new Subject<boolean>();

  cardOnEditMode: Menu;
  cardOnEditModeChanged = new Subject<Menu>();

  confirmExitEditMode = new Subject();

  constructor() { }


  switchEditMode() {
    if (this.cardOnEditMode)
      this.confirmExitEditMode.next();
    else {
      this.editMode = !this.editMode;
      this.editModeChanges.next(this.editMode);
    }
  }


  addCardOnEditMode(menu: Menu) {
    this.cardOnEditMode = menu;
    this.cardOnEditModeChanged.next(this.cardOnEditMode);
  }


  removeCardOnEditMode() {
    this.cardOnEditMode = null;
    this.cardOnEditModeChanged.next(null);
  }

}
