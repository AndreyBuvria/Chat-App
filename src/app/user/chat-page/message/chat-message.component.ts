import { Message } from './../../shared/interfaces/message.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() public msg!: Message

  constructor() { }

  ngOnInit(): void {
  }

}
