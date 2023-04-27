import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FooterComponent  } from '../footer/footer.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  allianceImg = environment.allianceImg;

  selectedGender: string = '';

  onGenderSelected() {
    console.log('Selected gender:', this.selectedGender);
  }

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = Array.from({ length: 100 }, (_, i) => i + 1920);

  constructor(){
    this.selectedGender = '';
  }
  ngOnInit() {
   
  }
}
