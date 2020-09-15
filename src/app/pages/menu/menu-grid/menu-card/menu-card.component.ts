import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Menu } from '../../../../models/menu.model';
import { MenuService } from '../../../../services/menu.service';
import { MenuDataService } from '../../../../services/menu-data.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit, OnDestroy {
  @ViewChild('openConfirmModal') openConfirmModal: ElementRef;
  @ViewChild('inputImage') inputImage: ElementRef;

  @Input() productLink: Array<[]>;

  @Input() menu: Menu;

  imagePreview: SafeUrl;
  imageInputFile: File;

  menuEditMode: boolean;
  menuEditModeChangesSub: Subscription;
  confirmExitEditModeSub: Subscription;

  updateCardForm: FormGroup;

  cardEditMode: boolean = false;
  cardOnEditMode: Menu;
  cardEditModeChangesSub: Subscription;

  constructor(
    private menuService: MenuService,
    private menuDataService: MenuDataService,
    private _DomSanitizationService: DomSanitizer) { }



  ngOnInit(): void {
    this.menuEditMode = this.menuService.editMode;
    this.menuEditModeChangesSub = this.menuService.editModeChanges.subscribe(newEditMode => this.menuEditMode = newEditMode);

    this.cardOnEditMode = this.menuService.cardOnEditMode;
    this.cardEditModeChangesSub = this.menuService.cardOnEditModeChanged.subscribe(menu => this.cardEditMode = this.menu == menu ? true : false);

    this.confirmExitEditModeSub = this.menuService.confirmExitEditMode.subscribe(() => {
      if (this.updateCardForm.dirty)
        this.openConfirmModal.nativeElement.click();
    });

    this.updateCardForm = new FormGroup({
      inputImage: new FormControl(null),
      inputTitle: new FormControl(this.menu.title, {validators: [Validators.required, Validators.minLength(3)]})
    })
  }



  onImagePreview(event: Event) {
    if (event.target['files'].length > 0) {
      let imagePreviewUrl = URL.createObjectURL(event.target['files'][0]);
      this.imagePreview = this._DomSanitizationService.bypassSecurityTrustUrl(imagePreviewUrl);
      this.imageInputFile = event.target['files'][0];
    }
  }



  onSwitchCardEditMode() {
    this.menuService.addCardOnEditMode(this.menu);
  }



  onUpdateCard() {
    let inputTitle = this.updateCardForm.get('inputTitle');
    let inputImage = this.updateCardForm.get('inputImage');

    if (this.updateCardForm.dirty && this.updateCardForm.valid) {
      if (inputTitle.dirty && inputTitle.value !== this.menu.title)
        this.menuDataService.updateMenu(this.menu, {title: inputTitle.value});
      if (inputImage.dirty) {
        let menuTitle = this.menu.title !== inputTitle.value ? inputTitle.value : null;
        this.menuDataService.updateMenu(this.menu, {title: menuTitle, imageFile: this.imageInputFile});
      }
    }
    this.onCancelUpdateCard();
  }



  onCancelUpdateCard() {
    this.cardEditMode = false;
    this.menuService.removeCardOnEditMode();
    this.imagePreview = null;

    //RESET FORM
    this.updateCardForm.reset();
    this.updateCardForm.get('inputImage').setValue(null);
    this.updateCardForm.get('inputTitle').setValue(this.menu.title);
  }



  onDeleteCard() {
    this.menuDataService.deleteMenu(this.menu);

    if (this.menuDataService.menuList.length <= 1)
      this.menuService.switchEditMode();
  }



  ngOnDestroy() {
    this.onCancelUpdateCard()

    this.menuEditModeChangesSub.unsubscribe();
    this.cardEditModeChangesSub.unsubscribe();
    this.confirmExitEditModeSub.unsubscribe();
  }
}
