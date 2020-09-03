import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  private storage = firebase.storage();

  constructor() { }

  uploadImage(path: string, image: File) {
    this.storage.ref(path).put(image);
  }


  async downloadImage(path: string): Promise<string> {
    let imageUrl: string;
    await this.storage.refFromURL(`gs://massas-veneza.appspot.com/${path}`).getDownloadURL().then(url => imageUrl = url);
    return imageUrl;
  }


  deleteImage(path: string) {
    this.storage.refFromURL(`gs://massas-veneza.appspot.com/${path}`).delete();
  }
}
