import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private socket: WebsocketService) {}

  listenToUserLogin() {
    return this.socket.listen('login');
  }

  listenToUserDisconnect() {
    return this.socket.listen('user disconnect');
  }

  login(user: string) {
    return this.socket.emit('login', user);
  }

  getUserList(): Observable<string[]> {
    return this.users.asObservable();
  }
}
