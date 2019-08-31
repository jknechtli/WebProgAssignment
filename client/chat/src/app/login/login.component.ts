import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IGroup {
  name: string;
  channels: string[];
}

export interface IUser {
  username: string;
  birthday: string;
  age: number;
  email: string;
  password: string;
  valid: boolean;
  role: 0 | 5 | 10 | 15; // basic|groupAssis|groupAdmin|superAdmin
  groups: IGroup[];
}

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
  private url: string = "http://localhost:3000/api";
  // private http: DataService;

  constructor(private httpClient: HttpClient) {
    this.user = {
      username: "",
      password: ""
    } as IUser;
    // this.http= new DataService
  }

  ngOnInit() {
  }

  login() {

    const body = {
      email: this.user.email,
      upwd: this.user.password
    }
    console.log("Login attempt...");
    this.httpClient.post(this.url + '/auth', this.user, httpOptions)
      .subscribe((data: IUser) => {
        if (data.valid) {
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('userBirthday', data.birthday)
          sessionStorage.setItem('userAge', '' + data.age)
          sessionStorage.setItem('userEmail', data.email)
        }
      })
  }

}
