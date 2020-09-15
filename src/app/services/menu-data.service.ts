import { ErrorService } from './error.service';
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

  private clientID = this.authService.clientID;
  private defaultURL = `https://lacuisine-platform.firebaseio.com/${this.clientID}/menus`


  constructor(
    private http: HttpClient,
    private cloudStorageService: CloudStorageService,
    private authService: AuthService,
    private errorService: ErrorService) { }



  fetchMenus() {
    this.http.get<{ [key: string]: Menu }>(`${this.defaultURL}.json`)
      .pipe(map(responseData => {
        const menusArray: Menu[] = [];
        for (const key in responseData) {
          this.cloudStorageService.downloadImage(responseData[key].imagePath).then(imageDownloadUrl => {
            responseData[key].imageUrl = imageDownloadUrl;
            menusArray.push({ ...responseData[key], id: key });
          })
        };
        //TODO: SORT ALPHABBETICALLY
        return menusArray.sort((a, b) => a.title.localeCompare(b.title));
      })).subscribe(menusArray => {
        this.menuList = menusArray;
        this.menuListChanges.next(this.menuList);
      }
    )
  }


  addMenu(title: string, image: File) {
    if (!this.menuList.find(menu => menu.title == title)) {
      let menu: Menu = {
        title: title,
        imagePath: `${this.clientID}/menus/${title}`,
        imageUrl: null
      }

      this.cloudStorageService.uploadImage(menu.imagePath, image)

      this.http.post<{ [key: string]: Menu }>(`${this.defaultURL}.json`, menu)
      .subscribe(() => this.fetchMenus(),
        error => this.errorService.handleError(error)
      );
    }
  }



  updateMenu(menu: Menu, changes: {}) {
    let titleChange: string = changes['title'] || null;
    let imageFileChange: File = changes['imageFile'] || null;

    if (titleChange) {
      this.http.patch(`${this.defaultURL}/${menu.id}.json`, {'title':  titleChange}).subscribe(() => this.fetchMenus());
    }
    if (imageFileChange) {
      let imagePath = `${this.clientID}/menus/${titleChange || menu.title}`;
      this.cloudStorageService.deleteImage(menu.imagePath);
      this.cloudStorageService.uploadImage(imagePath, imageFileChange);
      this.http.patch(`${this.defaultURL}/${menu.id}.json`, {'imagePath':  imagePath}).subscribe(() => this.fetchMenus());
    }
  }



  deleteMenu(menu: Menu) {
    this.cloudStorageService.deleteImage(menu.imagePath);
    this.http.delete(`${this.defaultURL}/${menu.id}.json`).subscribe(() => this.fetchMenus());
  }
}
