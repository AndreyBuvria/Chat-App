import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';
import { Message } from '../interfaces/message.interface';

@NgxState()
@Injectable({
  providedIn: 'root'
})
export class MessageState extends ArrayState<Message> {
  constructor() {
    super([]); // Here you can set initial data.
  }
}
