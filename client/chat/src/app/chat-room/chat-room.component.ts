import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import io from 'socket.io-client';

const url: string = "http://localhost:3001/api";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface ILog {
  user: string;
  message: string;
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  private log: ILog[] = [];
  private toSend: string;
  private params;
  private username = sessionStorage.getItem('username');
  // private socket = io('http://localhost:3001');
  // private socketService = new SocketService();
  // private ioConnection;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private socketService: SocketService) {

    this.route.params.subscribe(params => console.log((this.params = params)));
  }

  ngOnInit() {
    // get logs

    if (!this.username) {
      this.router.navigateByUrl('/login');
    }

    const room = `${this.params.group}-${this.params.channel}`

    this.socketService.setRoom(room)
    this.socketService.getMessage((msg) => {
      this.log.push(msg);
    })


    const log: ILog = {
      message: `${this.username} has connected`,
      user: ''
    }
    this.socketService.sendMessage(log)

    this.httpClient.get<ILog[]>(url + `/chat/${this.params.group}/${this.params.channel}`, httpOptions)
      .subscribe((data) => {
        if (data) {
          console.log("data: ", data);
          this.log = [...data, ...this.log];
        }
      });
  }

  public ngOnDestroy() {
    const log: ILog = {
      message: `${this.username} has disconnected`,
      user: ''
    }
    this.socketService.sendMessage(log)

    this.socketService.disconnect();
  }

  updateToSend(event) {
    this.toSend = event.target.value;
  }

  send() {
    console.log('Sent message')

    const log: ILog = {
      message: this.toSend,
      user: this.username || 'Anon'
    }

    this.socketService.sendMessage(log)
    // this.socket.emit('chat-message', this.toSend);
    this.toSend = '';
  }
}
