import { Injectable, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit {

  private subject!: WebSocketSubject<any>
  private URL = 'ws://localhost:8000/ws/chat/'

  constructor() {
  }

  ngOnInit(): void {
  }

  public connectSocket(room_name: string) {
    this.subject = webSocket(this.URL + room_name + '/');
    return this.subject;
  }

  public sendMessage(msg: string) {
    this.subject.next(msg);
  }

  public unsubscribe() {
    this.subject.unsubscribe();
  }
}
