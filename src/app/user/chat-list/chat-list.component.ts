import { RoomService } from './../shared/services/room.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from '../shared/interfaces/room.interface';
import { ApiService } from '../shared/apis/api.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
  public rooms: Observable<Room[] | null> = this.roomSevice.data$;

  private subcriber!: Subscription;

  constructor(
    private roomSevice: RoomService,
  ) {}

  ngOnInit(): void {
    this.initRooms();
  }
  ngOnDestroy(): void {
    this.subcriber.unsubscribe();
  }

  private initRooms() {
    this.subcriber = this.roomSevice.get().subscribe();
  }

}
