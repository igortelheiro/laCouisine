import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  private storage = firebase.storage();

  constructor(private errorService: ErrorService) { }


  uploadImage(path: string, image: File): any {
    return this.storage.ref(path).put(image)
      .catch(error => {
        console.error('error uploading image: ', error);
        // this.errorService.handleError(error);
    });
  }


  async downloadImage(path: string): Promise<string> {
    let imageUrl: string;
    await this.storage.ref(path).getDownloadURL().then(url => imageUrl = url)
      .catch(error => {
        console.error('error downloading image: ', error);
        // this.errorService.handleError(error);
      });
    return imageUrl;
  }


  deleteImage(path: string) {
    this.storage.ref(path).delete()
      .catch(error => {
        console.error('error deleting image: ', error);
        // this.errorService.handleError(error);
      });
  }
}
