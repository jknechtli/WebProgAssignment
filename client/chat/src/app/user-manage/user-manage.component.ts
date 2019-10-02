import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { INewGroup, IUser } from 'src/interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3001/api";

interface IUserGroup {
  name: string;
  channels: {
    name: string;
    users: string[];
  }[];
}

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {
  private groups: INewGroup[] = [];
  private users: IUser[] = [];
  private userOptions: {
    value: string;
    label: string;
  }[] = [];
  private store = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<INewGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("Groups: ", data);
          this.groups = data;
        }
      });

    this.httpClient.get<IUser[]>(url + '/users', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("users: ", data);
          this.users = data;

          this.users.forEach(user => {
            this.userOptions.push({ value: user.username, label: user.username });
          });
        }
      });
  }

  addUserToChannel(group: string, channel: string) {

    const name = this.store[group + channel]

    if (name === '') {
      return
    }

    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels = g.channels.map(c => {
          if (c.name === channel) {
            c.users.push(name)
          }
          return c;
        })
      }
      return g;
    })

    this.store[group + channel] = undefined;
  }

  removeChannelFromGroup(group: string, channel: string, user: string) {

    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels = g.channels.map(c => {
          if (c.name === channel) {
            c.users = c.users.filter(u => u !== user);
          }
          return c;
        })
      }
      return g;
    })
  }

  save() {

    this.users = this.users.map(u => {
      u.groups = [];
      return u;
    })

    console.log(this.groups);
    // return
    this.httpClient.post<INewGroup[]>(url + '/groups/users', this.groups, httpOptions)
      .subscribe((data) => {
        if (data) {
          // TODO: add something here
        }
        else {
          alert("Failed to update");
        }
      });
  }

  selectChange(event, group, channel) {
    this.store[group + channel] = event.target.value;
  }
}
