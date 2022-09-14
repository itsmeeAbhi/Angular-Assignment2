import { Component, OnInit } from '@angular/core';
import { User } from '../Model/user';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInuser:string
  user: User[];
  constructor(private loginService:LoginService) { }

  ngOnInit() {
    if(!localStorage.getItem("userType")){
      this.loginService.loggedInuser.subscribe(res => {
        this.loggedInuser =  res; 
       })
    }else{
      this.loggedInuser= localStorage.getItem("userType");
    }
    
  }
}