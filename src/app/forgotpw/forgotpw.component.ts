import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FooterComponent  } from '../footer/footer.component';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent {
  hide = true;
  allianceImg = environment.allianceImg;

}
