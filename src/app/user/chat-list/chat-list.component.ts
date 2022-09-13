import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Room } from '../shared/interfaces/room.interface';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  public rooms!: Room[]

  private subcriber!: Subscription

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.subcriber = this.api.getAllRooms().subscribe({
      next: rooms => this.rooms = rooms,
      error: err => console.log(err),
    });
  }

  text(val: string) {
    console.log(val);
  }

  ngOnDestroy(): void {
    this.subcriber.unsubscribe();
  }

}
