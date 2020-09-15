import { MenuDataService } from '../../services/menu-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';

import { Menu } from '../../models/menu.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuList: Menu[] = [];
  menuListChangesSub: Subscription;

  menuEditMode: boolean;
  menuEditModeChangesSub: Subscription;

  routeChangesSub: Subscription;

  constructor(
    private menuService: MenuService,
    private menuDataService: MenuDataService) { }


  ngOnInit(): void {
    this.menuDataService.fetchMenus();
    this.menuListChangesSub = this.menuDataService.menuListChanges.subscribe(newMenuList => {
      this.menuList = newMenuList

      this.menuEditMode = this.menuService.editMode;
      this.menuEditModeChangesSub = this.menuService.editModeChanges.subscribe(newEditMode => this.menuEditMode = newEditMode);
    });
  }



  onSwitchEditMode() {
    this.menuService.switchEditMode();
  }


  ngOnDestroy() {
    if (this.menuEditMode)
      this.menuService.switchEditMode();

    this.menuListChangesSub.unsubscribe();
    this.menuEditModeChangesSub.unsubscribe();
  }
}
