import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '../../shared/services/websocket.service';

@Component({
  selector: 'app-chat-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  @Output() public valueEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public onTrigEvent(value: string, input: HTMLInputElement) {
    this.valueEvent.emit(value);
    input.value = '';
  }

}
