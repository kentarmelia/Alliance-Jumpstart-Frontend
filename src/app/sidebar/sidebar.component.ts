import { Component,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  allianceImg = environment.allianceImg;
  allianceSquare = environment.allianceSquare;
  allianceText = environment.allianceText;
  isLoading = false;
  firstname:string = "";
  lastname:string ="";
  email:any;
  profileName = "Profile"
  isAdmin:boolean = false;
  profileImage = "";
  constructor(
    private router:Router,
    private dialog: MatDialog,
    private localstorage:LocalStorage
  ){

  }
async ngOnInit() {
  const firstname = await this.localstorage.getItem('firstname').toPromise();
  const lastname = await this.localstorage.getItem('lastname').toPromise();
  const email = await this.localstorage.getItem('email').toPromise();
  const user_type = await this.localstorage.getItem('user_type').toPromise();
  const userID = await this.localstorage.getItem('userID').toPromise();

  
  if(firstname != "" && lastname != "" && email != ""){
    this.profileName = `${firstname} ${lastname}`;
    this.email = email;
    this.profileImage = environment.apiURL + "/user/image/"+userID;
    
    if(user_type === 'admin'){
      this.isAdmin = true;
    }
  }




  console.log('firstname: '+this.firstname);
  console.log('lastname: '+this.lastname);

  if(this.firstname != "" && this.lastname != ""){
    this.profileName = "${this.firstname} ${this.lastname}";
  }

    
}
  openLoadingDialog() {
    this.dialog.open(LoadingComponent);
  }

  async showLoading() {
    this.openLoadingDialog();
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.dialog.closeAll();
  }


  async navigateDashboard()
  {
    await this.showLoading();
    await this.router.navigate(['/dashboard']);
  }
  async navigateMyTickets()
  {
    await this.showLoading();
    await this.router.navigate(['/mytickets']);
  }
  async navigateTicketManagement()
  {
    await this.showLoading();
    await this.router.navigate(['/ticketmanagement']);
  }
  async navigateUserManagement()
  {
    await this.showLoading();
    await this.router.navigate(['/usermanagement']);
  }
  async navigateProfile()
  {
    await this.showLoading();
    await this.router.navigate(['/profile']);
  }
 
}
