import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-chat-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  @Output() valueEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onValue(value: string) {
    this.valueEvent.emit(value);
  }

}
