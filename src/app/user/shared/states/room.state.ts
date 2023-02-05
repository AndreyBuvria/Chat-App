import { Room } from './../interfaces/room.interface';
import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class RoomState extends ArrayState<Room> {
  constructor() {
    super([]); // Here you can set initial data.
  }

  protected override getItemId(item: Room) {
    return item.id;
  }
}
