import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IGroup, IUser } from '../login/login.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3000/api";

@Component({
  selector: 'app-chat-hub',
  templateUrl: './chat-hub.component.html',
  styleUrls: ['./chat-hub.component.css']
})
export class ChatHubComponent implements OnInit {
  private groups: IGroup[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('userRole');

    this.httpClient.get<IUser>(url + `/user/${username}`, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data.groups;
        }
      });
  }
}