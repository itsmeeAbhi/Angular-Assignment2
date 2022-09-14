import { Injectable } from '@angular/core';
import { User } from '../Model/user';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user = new BehaviorSubject<User>(null);
  isAuth = new Subject<boolean>();
  loggedInuser = new BehaviorSubject<any>('');
  loggedInType = new BehaviorSubject<any>('');
  logoutUser = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  isloggedIn = true;
  loggedIn = false;
  loggedOut= false;
  userLogin = true;


  isAuthneticated() {
    this.loggedIn = (localStorage.getItem('user') === 'true');
    this.isloggedIn= (localStorage.getItem('admin')==='true');
    const promise = new Promise(
      (resolve) => {
        setTimeout(() => {
          resolve(this.loggedIn)
        })
      }
    );
    return promise;
  }
  islogout(){
    this.loggedOut = !(localStorage.getItem('user') === 'true');

    const promise = new Promise(
      (resolve) => {
        setTimeout(() => {
          resolve(this.loggedOut)
        })
      }
    );
    return promise;

  }
  public loginUserFromRestApi(user): Observable<any> {
    return this.http.get<User[]>("http://localhost:9091/userAccount/checkuserexists",
      {
        params: new HttpParams().set('employeeId', user.employeeId).set('password', user.password)
      });
  }

  // public checkUserType(user): Observable<any> {
  //   return this.http.get<User[]>("http://localhost:9090/userAccount/findbyempid",
  //     {
  //       params: new HttpParams().set('employeeId', user.employeeId)
  //     });
  // }
  logout() {
    this.logoutUser.next(false);
    this.user.next(null);
    localStorage.clear()
  }
}
