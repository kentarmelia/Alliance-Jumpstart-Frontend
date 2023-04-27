


import { FooterComponent } from '../footer/footer.component';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private session:SessionService
  ){

  }


  hide = true;
  allianceImg = environment.allianceImg;

  async ngOnInit(){
    var isStart = false;
    await this.session.checkSession(isStart);
  }

}
