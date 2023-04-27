import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from '../loading/loading.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
import { ModalComponent } from '../modal/modal.component';
import { ComponentFactoryResolver, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UtilService } from '../util.service';
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  isLoading = false;
  filter = "all";
  sort = "asc";
  pageNumber = 0;
  maxRecords = 5;
  pageCount = 0;
  userData: any;
  pageSizeOptions = [5, 10, 25, 100];
  apiUrl = environment.apiURL;
  searchQuery = "";


  user_email: string = "";
  user_firstname: string = "";
  user_lastname: string = "";
  user_contact: string = "";
  selectedUserType: string = "";

  isSearch = false;
  users_type_option = [
    { value: "admin", checked: false, imageUrl: "../../assets/icons/admin.png", label: "Admin" },
    { value: "billing", checked: false, imageUrl: "../../assets/icons/billing.png", label: "Billing In-Charge" },
    { value: "client", checked: false, imageUrl: "../../assets/icons/client.png", label: "External Client" },
    { value: "collection", checked: false, imageUrl: "../../assets/icons/collection.png", label: "Collection In-Charge" },
    { value: "sales", checked: false, imageUrl: "../../assets/icons/sales.png", label: "Sales Team" },
    { value: "treasury", checked: false, imageUrl: "../../assets/icons/treasury.png", label: "Treasury" }
  ];

  user_type_option_individual: any;
  constructor(
    private session: SessionService,
    private localstorage: LocalStorage,
    private router: Router,
    private location: Location,
    private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef,
    private _snackBar: MatSnackBar,
    private util: UtilService
  ) {

  }
  async ngOnInit() {
    this.isLoading = true;
    var isStart = false;
    await this.session.checkSession(isStart);
    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);
    this.isLoading = false;
  }


  async getUserData(searchQuery: string, maxRecords: number, pageNumber: number) {


    const accessToken = await this.localstorage.getItem('access_token').toPromise();

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };



    await this.countUserData(this.searchQuery, this.filter);



    this.isLoading = true;

    if (searchQuery.length > 0) {
      const data ={
        "searchQuery":searchQuery,
        "pageNumber":pageNumber+1,
        "maxRecords":maxRecords,
        "sort":this.sort,
        "filter":this.filter
      };
          
    try{
      const response = await axios.post(environment.apiURL+'/user/searchUser',data,options)
      const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingTime));

      return await Promise.all([response, loadingPromise])
    .then(([response]) => {
      // Handle the response here
      console.log(response.data);
      
      this.userData = response.data.data;

      this.isLoading =false;
   
    })
    .catch(error => {
      // Handle the error here
      console.log(error);
      this.isLoading =false;
    
    });
   
   
    }catch(error){
      console.error(error);
      this.isLoading =false;
 
    }

    }
    else {
      const data = {

      };

      try {
        const response = await axios.post(environment.apiURL + '/user/pagedSearchList/' + maxRecords + '/' + (pageNumber + 1) + '/' + this.filter + '/' + this.sort, data, options)
        const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingTime));

        return await Promise.all([response, loadingPromise])
          .then(([response]) => {
            // Handle the response here
            console.log(response.data);

            this.userData = response.data.data.resultList;

            this.isLoading = false;

          })
          .catch(error => {
            // Handle the error here
            console.log(error);
            this.isLoading = false;

          });


      } catch (error) {
        console.error(error);
        this.isLoading = false;

      }

    }


  }

  async countUserData(searchQuery: string, filter: string) {
    const accessToken = await this.localstorage.getItem('access_token').toPromise();
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    };

    if (searchQuery.length > 0) {
      const searchData = {
        "searchQuery": searchQuery,
        "filter": filter
      }
      try {


        const response = await axios.post(environment.apiURL + '/user/countSearchUser', searchData, options)

        return await Promise.all([response])
          .then(([response]) => {
            // Handle the response here
            console.log(response.data.data);
            this.pageCount = response.data.data;
          })
          .catch(error => {
            // Handle the error here
            console.log(error);

          });

      } catch (error) {
        console.error(error);

      }

    }
    else {
      try {


        const response = await axios.get(environment.apiURL + '/user/count/' + this.filter, options)

        return await Promise.all([response])
          .then(([response]) => {
            // Handle the response here
            console.log(response.data.data);
            this.pageCount = response.data.data;
          })
          .catch(error => {
            // Handle the error here
            console.log(error);

          });

      } catch (error) {
        console.error(error);

      }
    }

  }


  async onSelectFilterChange(value: any) {
    console.log('Selected value: ', value);

    this.pageNumber = 0;
    this.maxRecords = 5;
    this.pageCount = 0;
    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);

  }
  async onSelectSortChange(value: any) {
    console.log('Selected value: ', value);

    this.pageNumber = 0;
    this.maxRecords = 5;
    this.pageCount = 0;

    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);

  }
  async onPageSizeChanged(event: any) {
    console.log("PAGE SIZE: " + event.pageSize);
    this.maxRecords = 0;
    this.maxRecords = event.pageSize;

    await this.getUserData(this.searchQuery, event.pageSize, 0);
  }

  async onPageChanged(event: any) {

    this.maxRecords = event.pageSize;

    // check which button was clicked
    if (event.previousPageIndex < event.pageIndex) {
      console.log('Next button clicked');
      // do something when the next button is clicked
      console.log('Page number: ' + (event.pageIndex + 1));
      this.pageNumber = this.pageNumber + 1;
    } else {
      console.log('Previous button clicked');
      // do something when the previous button is clicked
      console.log('Page number: ' + (event.pageIndex - 1));
      if (this.pageNumber > 0) {
        this.pageNumber = this.pageNumber - 1;
      }
      else {
        this.pageNumber = 0;
      }

    }
    console.log('Page size: ' + event.pageSize);
    console.log('data total: ' + event.length);
    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);
  }



  // View user modal configuration
  // -----------------------------------------------------------------------------

  @ViewChild('viewUserModalContent') viewUserModalContent!: TemplateRef<any>;
  viewUserModalRef: any;

  openViewUserModal(userID: any) {

    this.user_email;
    this.user_firstname;
    this.user_lastname;
    this.user_contact;


    for (const user of this.userData) {
      if (user.userID === userID) {
        this.user_email = user.email;
        this.user_firstname = user.firstname;
        this.user_lastname = user.lastname;
        this.user_contact = user.contact_number;

        for (const user_type of this.users_type_option) {

          if (user.user_type === user_type.value) {
            this.user_type_option_individual = {
              value: user_type.value,
              checked: false,
              imageUrl: user_type.imageUrl,
              label: user_type.label

            }
          }
        }

      }


    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.viewUserModalRef = this.viewContainerRef.createComponent(factory);
    this.viewUserModalRef.instance.modalContent = this.viewUserModalContent;

    this.viewUserModalRef.instance.confirmEvent.subscribe((result: boolean) => {
      this.viewUserModalRef.destroy();
      if (result) {
        console.log('User view closed');
      }
    });
  }


  onCloseViewUserModal() {

    this.viewUserModalRef.instance.onClose();
    this.clearInputs();
    this.isLoading = false;


  }


  // Add user modal configuration
  // -----------------------------------------------------------------------------
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  modalRef: any;

  openAddUserModal() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.modalRef = this.viewContainerRef.createComponent(factory);
    this.modalRef.instance.modalContent = this.modalContent;
    this.modalRef.instance.confirmEvent.subscribe((result: boolean) => {
      this.modalRef.destroy();
      if (result) {
        console.log('User added!');
      }
    });
  }

  onClose() {
    this.clearInputs();
    this.isLoading = false;
    this.modalRef.instance.onClose();


  }

  async onConfirm() {

    const email = this.user_email;
    const firstname = this.user_firstname;
    const lastname = this.user_lastname;
    const contact = this.user_contact;
    const user_type = this.selectedUserType;


    if (
      email != "" && firstname != "" && lastname != "" && contact != "" && user_type != ""
    ) {
      this.isLoading = true;
      const userID = await this.util.getMaxID() + 1;
      const password = this.util.generateRandomPassword();
      console.log('Complete Field');
      console.log(userID);
      console.log(email);
      console.log(password);
      console.log(firstname);
      console.log(lastname);
      console.log(contact);
      console.log(user_type);


      const addUserData = new FormData();
      addUserData.append("userID", userID.toString());
      addUserData.append("email", email);
      addUserData.append("password", password);
      addUserData.append("firstname", firstname);
      addUserData.append("lastname", lastname);
      addUserData.append("contact_number", contact);
      addUserData.append("user_type", user_type);
      addUserData.append("created_at", this.util.getCurrentDateTime());

      const access_token = await this.localstorage.getItem('access_token').toPromise();
      const options = {
        headers: {
          Authorization: "Bearer " + access_token
        }
      };

      try {
        const response = await axios.post(environment.apiURL + '/user/create', addUserData, options)
        const loadingPromise = new Promise(resolve => setTimeout(resolve, environment.loadingTime));

        return await Promise.all([response, loadingPromise])
          .then(([response]) => {
            console.log(response.data);
            this.clearInputs();
            this.isLoading = false;
            this.modalRef.instance.onConfirm();
            this.openSnackBar('User added. User credentials sent through email', 'OK');
            this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);
          })
          .catch(error => {
            console.log(error);
            this.isLoading = false;
          });
      } catch (error) {
        console.log(error);
      }

    }
    else {
      console.log('Incomplete Field');
      this.openSnackBar('Incomplete Fields', 'OK')
    }

    // this.isLoading=true;
    // this.isLoading=false;

  }



  // -----------------------------------------------------------------------------



  logValue(event: any) {
    this.selectedUserType = event.target.value;
    console.log(this.selectedUserType);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  clearInputs() {
    this.user_email = "";
    this.user_firstname = "";
    this.user_lastname = "";
    this.user_contact = "";
    this.selectedUserType = "";
    this.users_type_option = [
      { value: "admin", checked: false, imageUrl: "../../assets/icons/admin.png", label: "Admin" },
      { value: "billing", checked: false, imageUrl: "../../assets/icons/billing.png", label: "Billing In-Charge" },
      { value: "client", checked: false, imageUrl: "../../assets/icons/client.png", label: "External Client" },
      { value: "collection", checked: false, imageUrl: "../../assets/icons/collection.png", label: "Collection In-Charge" },
      { value: "sales", checked: false, imageUrl: "../../assets/icons/sales.png", label: "Sales Team" },
      { value: "treasury", checked: false, imageUrl: "../../assets/icons/treasury.png", label: "Treasury" }
    ];
  }


  async clearSearch() {
    this.searchQuery = "";
    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);
  }

  onSearchChange() {
    if (this.searchQuery.length > 0) {
      this.isSearch = true;
    }
    else {
      this.isSearch = false;
    }
  }

  async searchUser(){
    await this.getUserData(this.searchQuery, this.maxRecords, this.pageNumber);
  }
}
