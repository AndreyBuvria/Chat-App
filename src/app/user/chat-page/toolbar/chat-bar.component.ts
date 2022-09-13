import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public user!: string | null

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
  }

}
