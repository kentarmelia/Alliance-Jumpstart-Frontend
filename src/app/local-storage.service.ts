import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(   private localStorage: LocalStorage) { }


  
  async saveData(dataname:any,data: any) {
    await this.localStorage.setItem(dataname, data).subscribe(() => {
      console.log(dataname+ ' saved to storage');
    });
  }

  async getData(data:any) {
     await this.localStorage.getItem(data).subscribe((response:any) => {
      console.log(data+ ' retrieved from local storage');
      return response.toString();
    });
  }
}
