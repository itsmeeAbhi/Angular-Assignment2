import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { User } from '../Model/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  msg = '';

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
  }
  
  loginUser() {
    this.service.loginUserFromRestApi(this.user).subscribe(
      data => {
        if (data) {
          this.service.isAuth.next(true);
          this.service.user.next(this.user)
          this.router.navigate(['home']);
          localStorage.setItem('user','true')
        } else {
          console.log("Invalid Credentials")
          this.msg = "Password Invalid"
        }
      },
      error => {
        console.log("something went wrong");
        this.msg = "Please Enter Valid Username & Password";
      }

    );

    this.service.checkUserType(this.user).subscribe(
      data => {
        this.service.loggedInuser.next(data.employeeId);
        this.service.loggedInType.next(data.employeeId);
        if (data.type === "admin") {
          localStorage.setItem("admin", "true")
          localStorage.setItem("userType", "admin")
        }
      }
    )
  }

}
