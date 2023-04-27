import { Component,OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from '../loading/loading.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalComponent } from '../modal/modal.component';
import { ComponentFactoryResolver, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  firstname:any = "";
  lastname:any = "";
  email:any = "";
  contact_number:any = "";
  user_type:any = "";
  createdAt:any = "";
  year:any="";
  month:any="";
  isLoading = false;
  profileImage = "";

  constructor(
    private session:SessionService,
    private localstorage:LocalStorage,
    private router:Router,
    private location:Location,
    private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef

  ){

  }
  async ngOnInit(){
    this.isLoading=true;
    var isStart = false;
    await this.session.checkSession(isStart);
    await this.getProfileInfo();




  }

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  modalRef:any;
  openLogoutModal() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.modalRef = this.viewContainerRef.createComponent(factory);
    this.modalRef.instance.title = 'Confirm Delete';
    this.modalRef.instance.modalContent = this.modalContent;
    this.modalRef.instance.confirmEvent.subscribe((result: boolean) => {
      this.modalRef.destroy();
      if (result) {
        console.log('Delete confirmed!');
      }
    });
  }

  onClose(){
    this.modalRef.instance.onClose();

  }

  async onConfirm(){
    await this.modalRef.instance.onConfirm();
    this.isLoading=true;
    await this.logOut();
    this.isLoading=false;

  }

  async getProfileInfo(){
    const accessToken = await this.localstorage.getItem('access_token').toPromise();
    const userID = await this.localstorage.getItem('userID').toPromise();

    console.log(`${accessToken} retrieved from local storage`);
    console.log(`${userID} retrieved from local storage`);
  
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };
  
    try {
      const response = await axios.get(`${environment.apiURL}/user/userinfo/${userID}`, options);
      
      this.firstname = response.data.data[0].firstname;
      this.lastname = response.data.data[0].lastname;
      this.email = response.data.data[0].email;
      this.contact_number = response.data.data[0].contact_number;
      this.user_type = response.data.data[0].user_type;
      this.createdAt = response.data.data[0].createdAt.substring(0,7);

      this.profileImage = environment.apiURL+"/user/image/"+userID;

      const [year, month] = this.createdAt.split('-');

      this.year = year;
      this.month = this.getMonthName(month);
      this.isLoading = false;
 
    } catch (error) {
      console.error(error);

    }
   
 
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  }

  async logOut(){
    await this.session.logOut();
  }

}
