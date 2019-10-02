import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private room: string;

  constructor() {
  }

  setRoom(room: string) {
    this.room = room;
    this.socket =
      //  io('http://localhost:3001');
      io.connect('http://localhost:3001/' + room, {
        query: 'ns=' + room,
        resource: "socket.io"
      });

    // this.socket.emit('connectRoom', room);
  }

  getMessage(next) {
    this.socket.on('chat-message', (msg) => {
      console.log('get message: ', msg);
      next(msg);
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  // onMessage(): Observable<any> {
  //   const observable = new Observable(observer => {
  //     this.socket.on('chat-message', (msg) => {
  //       console.log('on message: ', msg);
  //       observer.next(msg);
  //     });
  //   });
  //   return observable;
  // }

  sendMessage(message, next?) {
    console.log('message sent')
    this.socket.emit('chat-message', message);
  }
}
