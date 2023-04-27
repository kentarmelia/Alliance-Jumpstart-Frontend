import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { FooterComponent  } from '../footer/footer.component';
import axios from 'axios';
import { LoadingComponent } from '../loading/loading.component';
import { MatCheckbox } from '@angular/material/checkbox';


import { SessionService } from '../session.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  allianceWhiteImg = environment.allianceWhiteImg;
  isChecked: boolean = false;


  isInvalidLogin:boolean = false;
  allianceImg = environment.allianceImg;
  loginForm:FormGroup;
  constructor(
    private fb:FormBuilder,

    private router:Router,
    private session:SessionService
 
    ){
    this.loginForm = this.fb.group({
      email:new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
    });




   





  }
 async  ngOnInit() {
  var isStart = true;
  await this.session.checkSession(isStart);
  }

  async ngAfterInit(){
  
  }

 async onSubmit(){
    const { email, password } = this.loginForm.value;
    console.log(`Username: ${email}, Password: ${password}`);

    const loginData = new FormData();

    loginData.append('username', email);
    loginData.append('password',password);
    loginData.append('grant_type','password');

    const options = {
      headers:{
        Authorization: environment.auth_key
      }
    };

    this.isLoading = true;
    try{
      const response = await axios.post(environment.apiURL+'/oauth/token', loginData,options)
      const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingTime));

      return await Promise.all([response, loadingPromise])
    .then(([response]) => {
      // Handle the response here
      console.log(response.data);
      
      this.session.addSession(response);
      this.isLoading =false;
      this.router.navigate(['/dashboard']);
    })
    .catch(error => {
      // Handle the error here
      console.log(error);
      this.isLoading =false;
      this.isInvalidLogin = true;
    });
   
   
    }catch(error){
      console.error(error);
      this.isLoading =false;
      this.isInvalidLogin = true;
    }

  }
 
} 
