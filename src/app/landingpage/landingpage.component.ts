import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FooterComponent  } from '../footer/footer.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  hide = true;
  allianceImg = environment.allianceImg;


  constructor(private session:SessionService){

  }
  async  ngOnInit() {
    var isStart = true;
    await this.session.checkSession(isStart);
  }

  

}
