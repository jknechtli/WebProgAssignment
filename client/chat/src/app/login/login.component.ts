import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: IUser;
  private url: string = "http://localhost:3001/api";

  constructor(private router: Router, private httpClient: HttpClient) {
    this.user = {
      username: "",
      password: ""
    } as IUser;
  }

  ngOnInit() {
  }

  login() {
    console.log("Login attempt...");
    this.httpClient.post(this.url + '/auth', this.user, httpOptions)
      .subscribe((data: IUser) => {
        if (data.valid) {
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('userBirthday', data.birthday)
          sessionStorage.setItem('userAge', '' + data.age)
          sessionStorage.setItem('userEmail', data.email)

          sessionStorage.setItem('userRole', '' + data.role)

          this.router.navigateByUrl('/chat');
        }
        else {
          alert("Invalid login details");
        }
      })
  }

}
