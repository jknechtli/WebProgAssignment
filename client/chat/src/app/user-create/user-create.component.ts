import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser, IGroup } from 'src/interfaces/user';

const url: string = "http://localhost:3001/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  private user: IUser = {
    birthday: 'DD/MM/YYYY',
    username: '',
    email: '',
    role: 0,
    groups: [],
    age: 0,
    password: '',
    valid: undefined
  }
  private groups: IGroup[];

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.httpClient.get<IGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data;
        }
      });
  }

  ngOnInit() {
  }

  selectChange(event) {
    this.user.role = event.target.value;
  }

  isInChannel(channel: string) {
    return this.user.groups.some(g => g.channels.some(c => c === channel));
  }

  groupChange(group: string, channel: string) {
    let found = false;

    this.user.groups = this.user.groups.map(g => {
      if (g.name === group) {
        g.channels = g.channels.filter(c => {
          if (c === channel) {
            found = true;
          }

          return c !== channel;
        })
        if (!found) {
          g.channels.push(channel);
          found = true
        }
      }
      return g;
    });

    if (!found) {
      this.user.groups.push({
        name: group,
        channels: [channel]
      })
    }
  }

  save() {
    if (this.user.username == '') {
      return;
    }
    this.httpClient.post<IUser>(url + '/user', this.user, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.router.navigateByUrl('/users/' + this.user.username);
        }
        else {
          alert("Error creating user.")
        }
      });
  }
}
