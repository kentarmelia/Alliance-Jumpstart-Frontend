import { Injectable } from '@angular/core';
import axios from 'axios';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment  } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private localstorage:LocalStorage
  ) { }
  
  generateRandomPassword(): string {
    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const passwordLength = 6;
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }

  async getMaxID(){
    const accessToken = await this.localstorage.getItem('access_token').toPromise();
    var max = 0;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };
  
    try {
      const response = await axios.get(`${environment.apiURL}/user/countID`, options);
      max = response.data.data;
    } catch (error) {
      console.error(error);
      
    }

    return max;
  }

  getCurrentDateTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.padZero(currentDate.getMonth() + 1);
    const day = this.padZero(currentDate.getDate());
    const hours = this.padZero(currentDate.getHours());
    const minutes = this.padZero(currentDate.getMinutes());
    const seconds = this.padZero(currentDate.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
