import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { TicketmanagementComponent } from './ticketmanagement/ticketmanagement.component';
const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'notifications',component:NotificationsComponent},
  {path:'profile',component:ProfileComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'forgotpw', component: ForgotpwComponent},
  {path:'usermanagement', component: UsermanagementComponent},
  {path:'mytickets', component: MyticketsComponent},
  {path:'ticketmanagement', component:TicketmanagementComponent},
  {path:'', component: LandingpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
