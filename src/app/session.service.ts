import { Injectable } from '@angular/core';

import { LocalStorageService } from './local-storage.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import axios from 'axios';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private access_token:any;
  constructor(
    private localstorageservice:LocalStorageService,
    private localstorage:LocalStorage,
    private router:Router,
    private location:Location
  ) {
   

   }

  async addSession(response:any){

    await this.localstorageservice.saveData('userID',response.data.userID);
    await this.localstorageservice.saveData('email',response.data.email);
    await this.localstorageservice.saveData('firstname',response.data.firstname);
    await this.localstorageservice.saveData('lastname',response.data.lastname);
    await this.localstorageservice.saveData('access_token',response.data.access_token);
    await this.localstorageservice.saveData('refresh_token',response.data.refresh_token);
    await this.localstorageservice.saveData('token_type',response.data.token_type);
    await this.localstorageservice.saveData('scope',response.data.scope);
    await this.localstorageservice.saveData('user_type',response.data.user_type);
    await this.localstorageservice.saveData('authority',response.data.authorities[0].authority);

    this.access_token = response.data.access_token;
    console.log('Session data added');
  }
  async NgOnInit(){
  
  }
  async NgAfterInit(){

  }

  async checkSession(isStart:boolean) {
    const accessToken = await this.localstorage.getItem('access_token').toPromise();
    console.log(`${accessToken} retrieved from local storage`);
  
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };
  
    try {
      const response = await axios.get(`${environment.apiURL}/tokenValidation/${accessToken}`, options);
     
      if(response.data === 'Valid Token'){
        console.log('session valid')

        if(isStart===true){
          this.location.go('/dashboard');
          this.router.navigate(['/dashboard']);
        }
    
      }
      return response.data;
    } catch (error) {
      console.error(error);
      if(isStart===true){

      }
      else{
        this.location.go('/');
        this.router.navigate(['/']);
        return null;
      }

    }
  }

  async logOut() {

    const accessToken = await this.localstorage.getItem('access_token').toPromise();

    console.log(`${accessToken} retrieved from local storage`);

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };
        
    await this.localstorage.clear().subscribe(() => {
      console.log('Local storage cleared successfully');
    });
    
    try {
      const response = await axios.delete(`${environment.apiURL}/logout/${accessToken}`, options);
      

      this.location.go('/');
      this.router.navigate(['/']);
 
    } catch (error) {
      console.error(error);

    }

  }
}
