import { CloudStorageService } from './cloudStorage.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  menuList: Menu[];
  menuListChanges = new Subject<Menu[]>();

  clientID = this.authService.clientID;
  defaultURL = 'https://massas-veneza.firebaseio.com'


  constructor(
    private http: HttpClient,
    private cloudStorageService: CloudStorageService,
    private authService: AuthService) { }



  fetchMenus() {
    this.http.get<{ [key: string]: Menu; }>(`${this.defaultURL}/${this.clientID}/menus.json`)
      .pipe(map(responseData => {
        const menusArray: Menu[] = [];
        for (const key in responseData) {
          menusArray.push({ ...responseData[key], id: key });
        };
        return menusArray;
      })).subscribe(response => {
        this.menuList = response;
        this.menuListChanges.next(this.menuList);
      });
  }


  addMenu(title: string, image: File) {
    if (!this.menuList.find(menu => menu.title == title)) {
      let menu: Menu = {
        title: title,
        imagePath: `${this.clientID}/menus/${title}`,
      }

      this.cloudStorageService.uploadImage(menu.imagePath, image);

      this.http.post<{ [key: string]: Menu }>(`${this.defaultURL}/${this.clientID}/menus.json`, menu)
      .subscribe(() => this.fetchMenus());
    }
  }



  updateMenu(menu: Menu, changes: {}) {
    let imageFile: File = changes['imageFile'] || null;
    let title: string = changes['title'] || null;

    if (imageFile) {
      let imagePath = `${this.clientID}/menus/${imageFile.name}`;
      this.cloudStorageService.deleteImage(menu.imagePath);
      this.cloudStorageService.uploadImage(imagePath, imageFile);
      this.http.patch(`${this.defaultURL}/${this.clientID}/menus/${menu.id}.json`, {'imagePath':  imagePath}).subscribe(() => this.fetchMenus());
    }
    if (title) {
      this.http.patch(`${this.defaultURL}/${this.clientID}/menus/${menu.id}.json`, {'title':  title}).subscribe(() => this.fetchMenus());
    }
  }



  deleteMenu(menu: Menu) {
    this.cloudStorageService.deleteImage(menu.imagePath);
    this.http.delete(`${this.defaultURL}/${this.clientID}/menus/${menu.id}.json`).subscribe(() => this.fetchMenus());
  }
}
