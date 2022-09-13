import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MessageComponent } from './chat-page/message/chat-message.component';
import { ToolbarComponent } from './chat-page/toolbar/chat-bar.component';
import { SendComponent } from './chat-page/send/send.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ChatListComponent } from './chat-list/chat-list.component';
import { RoomComponent } from './chat-list/room/room-block.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ChatPageComponent,
    MessageComponent,
    ToolbarComponent,
    MainLayoutComponent,
    SendComponent,
    ChatListComponent,
    RoomComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/chat',
            pathMatch: 'full',
          },
          {
            path: 'chat',
            component: ChatListComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'chat/:room',
            component: ChatPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'login',
            component: LoginPageComponent
          },
        ]
      }
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class UserModule { }
