import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IUser, INewGroup } from 'src/interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3001/api";

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent implements OnInit {
  private channels: string[];
  private params;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient) {
    this.route.params.subscribe(params => console.log((this.params = params)));
  }

  ngOnInit() {
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('userRole');

    this.httpClient.get<INewGroup[]>(url + `/user/${username}/groups`, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          const groups = data;

          this.channels = groups.filter(g => g.name === this.params.group)[0]
            .channels.map(channel => channel.name);

          console.log('channels: ', this.channels)
        }
      });
  }
}


