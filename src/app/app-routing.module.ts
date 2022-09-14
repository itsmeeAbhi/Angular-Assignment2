import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login-guard';
import { AuthGuard } from './auth-guard';
import { InvalidComponent } from './invalid/invalid.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',canActivate: [LoginGuard], component: LoginComponent},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'booking', canActivate: [AuthGuard], component: BookingComponent },
  { path: 'booking-details/:bookingId', canActivate: [AuthGuard], component: BookingDetailsComponent },
  {path:'**', component: InvalidComponent}

  // { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
