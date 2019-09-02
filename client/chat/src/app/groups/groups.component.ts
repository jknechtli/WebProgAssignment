import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGroup } from '../login/login.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3000/api";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private groups: IGroup[] = [];
  private ass = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get<IGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data;
        }
      });
  }

  loadUpMyAss(event) {
    this.ass = event.target.value;
  }

  addChannelToGroup(group: string, name: string) {
    if (name === '') {
      return
    }

    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels.push(name)
      }
      return g;
    })
    this.ass = ''
  }

  addGroup(name: string) {
    if (name === '') {
      return
    }

    if (!this.groups.some(g => g.name == name)) {
      this.groups.push({
        name,
        channels: []
      })
    }
    this.ass = ''
  }


  removeChannelFromGroup(group: string, channel: string) {
    console.log(group, channel)
    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels = g.channels.filter(c => c !== channel);
      }
      return g;
    })
    this.ass = '';
  }

  save() {
    this.httpClient.post<IGroup[]>(url + '/groups', this.groups, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.groups = data;
        }
      });
  }

}
