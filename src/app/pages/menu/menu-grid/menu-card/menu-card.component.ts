import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { Menu } from '../../../../models/menu.model';
import { MenuService } from '../../../../services/menu.service';
import { MenuDataService } from '../../../../services/menu-data.service';
import { CloudStorageService } from '../../../../services/cloudStorage.service';

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
  imageToBeLoaded: string;

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
    private cloudStorageService: CloudStorageService,
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

    this.defineImageToBeLoaded();

    this.updateCardForm = new FormGroup({
      inputImage: new FormControl(null),
      inputTitle: new FormControl(this.menu.title, {validators: [Validators.required, Validators.minLength(3)]})
    })
  }



  //DEFINE CARD IMAGE
  async defineImageToBeLoaded() {
    if (!this.menu.imagePath)
      this.imageToBeLoaded = '../../../../assets/utilities/img_placeholder.png';
    else
      this.imageToBeLoaded = await this.cloudStorageService.downloadImage(this.menu.imagePath);
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
  let inputImage = this.updateCardForm.get('inputImage');
  let inputTitle = this.updateCardForm.get('inputTitle');

    if (this.updateCardForm.dirty && this.updateCardForm.valid) {
      if (inputImage.dirty)
        this.menuDataService.updateMenu(this.menu, {imageFile: this.imageInputFile});
      if (inputTitle.dirty && inputTitle.value !== this.menu.title)
        this.menuDataService.updateMenu(this.menu, {title: inputTitle.value});
    }
    this.onCancelUpdateCard();
  }



  onCancelUpdateCard() {
    this.cardEditMode = false;
    this.imagePreview = null;
    this.menuService.removeCardOnEditMode();

    //RESETE FORM
    this.updateCardForm.reset();
    this.updateCardForm.get('inputImage').setValue(null);
    this.updateCardForm.get('inputTitle').setValue(this.menu.title);
  }



  onDeleteCard() {
    this.menuDataService.deleteMenu(this.menu);
  }



  ngOnDestroy() {
    this.onCancelUpdateCard()

    this.menuEditModeChangesSub.unsubscribe();
    this.cardEditModeChangesSub.unsubscribe();
    this.confirmExitEditModeSub.unsubscribe();
  }
}
