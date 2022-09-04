import { WebsocketService } from './../shared/services/websocket.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../shared/interfaces/message.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  public msgs: Message[] = []

  private room!: string
  private subscriber!: Subscription

  constructor(private websocket: WebsocketService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriber = this.route.params.subscribe(params => {
      this.room = params['room'];
    })
    this.websocket.connectSocket(this.room).subscribe({
      next: (msg: any) => {
        console.log(msg)
        this.msgs.push(msg)
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  public onTakeMsg(value: string) {
    this.websocket.sendMessage(value);
  }

  ngOnDestroy(): void {
    this.websocket.unsubscribe();
    this.subscriber.unsubscribe();
  }

}
