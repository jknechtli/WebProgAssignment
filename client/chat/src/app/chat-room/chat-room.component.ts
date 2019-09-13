import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
// import io from 'socket.io-client';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private log: string[] = [];
  private toSend: string;
  // private socket = io('http://localhost:3000');
  // private socketService = new SocketService();
  // private ioConnection;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    // get logs
    this.socketService.getMessage((msg) => {
      this.log.push(msg);
    })

    // this.ioConnection = this.socketService.onMessage()
    //   .subscribe((msg) => {
    //     this.log.push(msg);
    //   });

    // this.socket.on('chat-message', (msg) => {
    //   console.log('hit');
    // });
  }

  updateToSend(event) {
    this.toSend = event.target.value;
  }

  send() {
    this.socketService.sendMessage(this.toSend)
    // this.socket.emit('chat-message', this.toSend);
    this.toSend = '';
  }
}
