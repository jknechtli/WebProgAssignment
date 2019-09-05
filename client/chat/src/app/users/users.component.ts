import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/interfaces/user';

const url: string = "http://localhost:3000/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: IUser[] = [];

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<IUser[]>(url + '/users', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.users = data;
        }
      });
  }

  editUser(user: IUser) {
    console.log(user);

    this.router.navigateByUrl(`/users/${user.username}/edit`);
  }

  getRole(role: number) {
    switch (role) {
      case 0: return "Basic User";
      case 5: return "Group Assistant";
      case 10: return "Group Admin";
      case 15: return "Super Admin";
      default: return "Unknown Role";
    }
  }
}
