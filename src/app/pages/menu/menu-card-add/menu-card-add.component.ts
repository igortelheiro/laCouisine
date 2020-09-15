import { Subscription } from 'rxjs';
import { Menu } from '../../../models/menu.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MenuDataService } from '../../../services/menu-data.service';

@Component({
  selector: 'app-menu-card-add',
  templateUrl: './menu-card-add.component.html',
  styleUrls: ['./menu-card-add.component.css']
})
export class AddMenuFormModalComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef;

  addMenuForm: FormGroup;
  imageFile: File;

  menuList: Menu[];
  menuListChangesSub: Subscription;

  constructor(private menuDataService: MenuDataService) { }


  ngOnInit(): void {
    this.menuList = this.menuDataService.menuList;
    this.menuListChangesSub = this.menuDataService.menuListChanges.subscribe(newMenuList => this.menuList = newMenuList);

    this.addMenuForm = new FormGroup({
      menuImage: new FormControl(null, {validators: [Validators.required]}),
      menuTitle: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
    })
  }


  getImageFile(file: File) {
    this.imageFile = file;
  }


  //TODO: VISUAL ERROR DUPLICATE MENU
  onSubmit() {
    console.log('submited')
    let title: string = this.addMenuForm.value.menuTitle;

    if (!this.menuList.find(menu => menu.title == title)) {
      this.menuDataService.addMenu(title, this.imageFile);
      this.addMenuForm.reset();
    }

    this.closeModal.nativeElement.click();
  }


  onCancelForm() {
    this.addMenuForm.reset();
  }


  ngOnDestroy() {
    this.menuListChangesSub.unsubscribe();
  }
}
