import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  allianceImg = environment.allianceWhiteImg;
  facebookIcon = environment.facebookIcon;
  instagramIcon = environment.instagramIcon;
  linkedinIcon = environment.linkedinIcon;
  twitterIcon = environment.twitterIcon;
  youtubeIcon = environment.youtubeIcon;

  constructor() {}
}
