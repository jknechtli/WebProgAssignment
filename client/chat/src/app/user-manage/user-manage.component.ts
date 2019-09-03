import { Component, OnInit } from '@angular/core';
import { IGroup, IUser } from '../login/login.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3000/api";

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
  private groups: IGroup[] = [];
  private users: IUser[] = [];
  private userGroups: IUserGroup[] = [];
  private tempVariable = '';
  private userOptions: {
    value: string;
    label: string;
  }[] = [];
  private store = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<IGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("Groups: ", data);
          this.groups = data;

          if (this.users.length > 0) {
            this.combineUserAndGroups();
          }
        }
      });

    this.httpClient.get<IUser[]>(url + '/users', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("users: ", data);
          this.users = data;

          if (this.groups.length > 0) {
            this.combineUserAndGroups();
          }
        }
      });
  }

  combineUserAndGroups() {

    this.users.forEach(user => {
      this.userOptions.push({ value: user.username, label: user.username });
    });
    this.groups.forEach(group => {

      const userGroup: IUserGroup = {
        name: group.name,
        channels: []
      }

      group.channels.forEach(channel => {
        const userChannel = {
          name: channel,
          users: []
        }

        this.users.forEach(user => {
          const isInChannel = user.groups && user.groups.find(UG => UG.name === group.name && UG.channels.some(UGC => UGC == channel))
          if (isInChannel) {
            userChannel.users.push(user.username)
          }
        });

        userGroup.channels.push(userChannel);
      });

      this.userGroups.push(userGroup);
    })
    console.log(this.userGroups);
  }

  addUserToChannel(group: string, channel: string) {

    const name = this.store[group + channel]

    if (name === '') {
      return
    }

    this.userGroups = this.userGroups.map(g => {
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

    this.userGroups = this.userGroups.map(g => {
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

    this.userGroups.forEach(group => {
      const groupName = group.name;

      group.channels.forEach(channel => {
        const channelName = channel.name;

        channel.users.forEach(user => {
          this.users = this.users.map(u => {
            if (user === u.username) {

              if (!u.groups.some(g => g.name === groupName)) {
                u.groups.push({
                  name: groupName,
                  channels: [channelName]
                })
              }
              else {
                u.groups = u.groups.map(g => {
                  if (g.name == groupName) {
                    g.channels.push(channelName);
                  }
                  return g;
                })
              }
            }
            return u;
          })
        });
      });
    });

    console.log(this.users);

    this.httpClient.post<IGroup[]>(url + '/groups/users', this.users, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data;
        }
      });
  }

  selectChange(event, group, channel) {
    this.store[group + channel] = event.target.value
  }
}
