import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

export interface Message {
  username: string;
  message: string;
  date: string;
  sender?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(
    []
  );

  constructor(private socket: WebsocketService) {}

  listenToChat() {
    return this.socket.listen('new message');
  }

  emitMessages(message: Message) {
    return this.socket.emit('new message', message);
  }

  getMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  addNewMessage(message: Message): void {
    this.getMessages().subscribe((messages: Message[]) => {
      messages.push(message);
      this.messages.next(messages);
    });
  }
}
