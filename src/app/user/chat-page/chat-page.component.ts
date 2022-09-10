import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../shared/services/api.service';
import { WebsocketService } from './../shared/services/websocket.service';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../shared/interfaces/message.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy, AfterViewChecked {

  public msgs!: Message[]

  private room!: string
  private subscriber!: Subscription

  @ViewChild('chatPlace') place!: ElementRef

  constructor(
    private websocket: WebsocketService,
    private route: ActivatedRoute,
    private api: ApiService,
    ) { }

  ngOnInit(): void {
    this.subscriber = this.route.params.subscribe({
      next: (params: Params) => {
        this.room = params['room'];
      },
      error: err => console.log(err),
    });
    this.subscriber = this.api.getAllMessages(this.room).subscribe({
      next: (msgSet: Message[]) => {
        this.msgs = msgSet;
        console.log(msgSet)
      },
      error: err => console.log(err),
    });
    this.websocket.connectSocket(this.room).subscribe({
      next: (msg: any) => {
        console.log(msg)
        this.msgs.push(msg)
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }
  ngAfterContentInit(): void {
    this.place.nativeElement.scrollTop = this.place.nativeElement.scrollHeight;

  }

  ngAfterViewChecked(): void {
    this.place.nativeElement.scrollTop = this.place.nativeElement.scrollHeight;
  }

  public onTakeMsg(value: string) {
    this.websocket.sendMessage(value);
  }

  ngOnDestroy(): void {
    this.websocket.unsubscribe();
    this.subscriber.unsubscribe();
  }

}
