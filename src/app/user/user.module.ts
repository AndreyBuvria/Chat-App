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

@NgModule({
  declarations: [
    LoginPageComponent,
    ChatPageComponent,
    MessageComponent,
    ToolbarComponent,
    MainLayoutComponent,
    SendComponent,
    ChatListComponent,
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
