import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IUser, IGroup } from '../login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url: string = "http://localhost:3000/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private params;
  private user: IUser;
  private groups: IGroup[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) {
    this.route.params.subscribe(params => console.log((this.params = params)));
  }

  ngOnInit() {
    this.httpClient.get<IUser>(url + `/user/${this.params.id}`, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.user = data;
        }
      });

    this.httpClient.get<IGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data;
        }
      });
  }

  check() {
    console.log(this.user.groups)
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
    // const dateNow = new Date();
    // const DOB = new Date('dd/MM/yyyy', this.user.birthday);

    // const difference = dateNow.getTime() - DOB.getTime();

    // console.log(dateNow);
    // console.log(DOB, this.user.birthday);
    // console.log(difference);
    // console.log(difference / 60);
    // console.log(difference / (60 * 60 * 24 * 365));

    // this.user.age = difference.
    this.httpClient.post<IUser>(url + '/user', this.user, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.router.navigateByUrl('/users/' + this.user.username);
        }
        else {
          alert("Error editing the user.")
        }
      });
  }

  delete() {
    const { username } = this.user;

    this.httpClient.delete(`${url}/user/${username}/delete`, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.router.navigateByUrl('/users');
        }
        else {
          alert("Error editing the user.")
        }
      });
  }
}
