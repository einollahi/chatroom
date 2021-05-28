import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socket: any;
  protocol = isDevMode() ? 3000 : window.location.port;
  readonly url: string =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    this.protocol;

  constructor() {
    this.socket = io(this.url);
  }

  listen(eventName: string) {
    return new Observable((subscriber: any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
