import { switchMap, Observable, of, tap } from 'rxjs';
import { ApiService } from './../apis/api.service';
import { MessageState } from './../states/message.state';
import { Injectable } from '@angular/core';
import { RoomIdState } from '../states/room-id.state';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public data$ = this.messageState.data$;

  constructor(
    private messageState: MessageState,
    private roomIdState: RoomIdState,
    private api: ApiService
  ) { }

  public get(): Observable<Message[] | null> {
    return this.roomIdState.data$
      .pipe(
        switchMap((roomID: number | null) => {
          return roomID ? this.api.getAllMessages(roomID) : of(null);
        }),
        tap((msgs: Message[] | null) => {
          if (!msgs) return;
          this.messageState.set(msgs);
        })
      );
  }
  public updateData(msg: Message) {
    this.messageState.pushItem(msg);
  }
}
