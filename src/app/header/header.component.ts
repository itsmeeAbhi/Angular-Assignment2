import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInuser:string
  login = false;
  constructor(private authservice: LoginService) { }
  ngOnInit() {
    this.login = (localStorage.getItem('user') === 'true');
    if(!localStorage.getItem("userType")){
      this.authservice.loggedInuser.subscribe(res => {
        this.loggedInuser =  res; 
       })
    }else{
      this.loggedInuser= localStorage.getItem("userType");
    }
    
  }
  onLogout() {
    this.authservice.logout();
    localStorage.clear();
  }
}
