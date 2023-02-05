import { Room } from './../interfaces/room.interface';
import { Injectable } from '@angular/core';
import { ArrayState, NgxState, PrimitiveState } from 'ngx-base-state';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class RoomIdState extends PrimitiveState<number> {}
