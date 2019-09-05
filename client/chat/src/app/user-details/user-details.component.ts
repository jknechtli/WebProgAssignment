import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGroup, IUser } from 'src/interfaces/user';

const url: string = "http://localhost:3000/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private params;
  private user: IUser;
  private groups: IGroup[];

  constructor(
    private route: ActivatedRoute,
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

  isInChannel(channel: string) {
    return this.user.groups.some(g => g.channels.some(c => c === channel));
  }
}
