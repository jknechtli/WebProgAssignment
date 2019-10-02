import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGroup } from 'src/interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const url: string = "http://localhost:3001/api";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  private groups: IGroup[] = [];
  private store = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.httpClient.get<IGroup[]>(url + '/groups', httpOptions)
      .subscribe((data) => {
        if (data) {
          this.groups = data;
        }
      });
  }

  loadUp(event, at: string) {
    this.store[at] = event.target.value;
    console.log(this.store)
  }

  addChannelToGroup(group: string) {
    const name = this.store[group];
    if (name === '') {
      return
    }

    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels.push(name)
      }
      return g;
    })
    this.store[group] = ''
  }

  addGroup() {
    const name = this.store['all'];
    if (name === '') {
      return
    }

    if (!this.groups.some(g => g.name == name)) {
      this.groups.push({
        name,
        channels: []
      })
    }
    this.store['all'] = ''
  }


  removeChannelFromGroup(group: string, channel: string) {
    this.groups = this.groups.map(g => {
      if (g.name == group) {
        g.channels = g.channels.filter(c => c !== channel);
      }
      return g;
    })
  }

  save() {
    this.groups.forEach(group => {
      this.httpClient.post<IGroup[]>(url + '/group', group, httpOptions)
        .subscribe((data) => {
          if (data) {
            this.groups = data;
          }
          else {
            alert('Could not save')
          }
        });
    })
  }

}
