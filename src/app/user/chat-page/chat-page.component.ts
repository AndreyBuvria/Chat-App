import { RoomService } from './../shared/services/room.service';
import { MessageService } from './../shared/services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../shared/apis/api.service';
import { WebsocketService } from './../shared/services/websocket.service';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../shared/interfaces/message.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy, AfterViewChecked {
  public msgs: Observable<Message[] | null> = this.messageService.data$;

  private subscriber!: Subscription;

  @ViewChild('chatPlace') place!: ElementRef;

  constructor(
    private websocket: WebsocketService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    const roomID = this.route.snapshot.params['room'];
    this.roomService.setCurrentRoomId(roomID);
    this.initWebsocket(roomID);
    this.initMessages();
  }
  ngAfterContentInit(): void {
    this.place.nativeElement.scrollTop = this.place.nativeElement.scrollHeight;
  }
  ngAfterViewChecked(): void {
    this.place.nativeElement.scrollTop = this.place.nativeElement.scrollHeight;
  }
  ngOnDestroy(): void {
    this.websocket.unsubscribe();
    this.subscriber.unsubscribe();
  }

  public onTakeMsg(value: string) {
    this.websocket.sendMessage(value);
  }
  private initWebsocket(roomID: number) {
    this.websocket.connectSocket(roomID).subscribe({
      next: (msg: any) => {
        this.messageService.updateData(msg);
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }
  private initMessages() {
    this.subscriber = this.messageService.get().subscribe();
  }

}
