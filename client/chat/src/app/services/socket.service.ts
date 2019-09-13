import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() {
    this.socket = io('http://localhost:3000');
  }

  getMessage(next) {
    this.socket.on('chat-message', (msg) => {
      console.log('get message: ', msg);
      next(msg);
    });
  }


  onMessage(): Observable<any> {
    const observable = new Observable(obsercer => {
      this.socket.on('chat-message', (msg) => {
        console.log('on message: ', msg);
        obsercer.next(msg);
      });
    });
    return observable;
  }


  sendMessage(message, next?) {
    this.socket.emit('chat-message', message);
  }
}
