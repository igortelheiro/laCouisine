import { MenuDataService } from '../../../services/menu-data.service';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../services/menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Menu } from '../../../models/menu.model';

@Component({
  selector: 'app-menu-grid',
  templateUrl: './menu-grid.component.html',
  styleUrls: ['./menu-grid.component.css']
})
export class MenuGridComponent implements OnInit, OnDestroy {
  menuList: Menu[];
  menuListChangesSub: Subscription;

  menuEditMode: boolean;
  menuEditModeChangesSub: Subscription;

  placeholderMenuCard: Menu = {
    title: 'Adicionar Cardápio',
    imagePath: null
  }

  constructor(private menuService: MenuService, private menuDataService: MenuDataService) { }

  ngOnInit(): void {
    this.menuList = this.menuDataService.menuList;
    this.menuListChangesSub = this.menuDataService.menuListChanges.subscribe(newMenuList => {
      this.menuList = newMenuList;

      this.menuEditMode = this.menuService.editMode;
      this.menuEditModeChangesSub = this.menuService.editModeChanges.subscribe(newEditMode => this.menuEditMode = newEditMode);
    });
  }

  ngOnDestroy() {
    this.menuListChangesSub.unsubscribe();
    this.menuEditModeChangesSub.unsubscribe();
  }
}
