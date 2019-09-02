import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private log: string[] = [];
  private toSend: string;

  constructor() { }

  ngOnInit() {
    // get logs
  }

  updateToSend(event) {
    this.toSend = event.target.value;
  }

  send() {
    this.log.push(this.toSend);
    this.toSend = '';
  }
}
