import { RoomIdState } from './../states/room-id.state';
import { Room } from './../interfaces/room.interface';
import { tap } from 'rxjs';
import { ApiService } from './../apis/api.service';
import { RoomState } from './../states/room.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public data$ = this.roomState.data$;

  public get dataCurrentID() {
    return this.roomIdState.data;
  }

  constructor(
    private roomState: RoomState,
    private roomIdState: RoomIdState,
    private api: ApiService
  ) { }

  public get() {
    return this.api.getAllRooms()
      .pipe(
        tap((rooms: Room[]) => this.roomState.set(rooms))
      );
  }

  public setCurrentRoomId(id: number) {
    this.roomIdState.set(id);
  }
}
