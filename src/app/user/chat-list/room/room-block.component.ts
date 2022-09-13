import { Component, Input, OnInit } from '@angular/core';
import { Room } from '../../shared/interfaces/room.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room-block.component.html',
  styleUrls: ['./room-block.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() public room!: Room

  constructor() { }

  ngOnInit(): void {
  }

  public onDelete() {

  }

}
