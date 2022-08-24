import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MessageComponent } from './chat-page/message/chat-message.component';
import { ToolbarComponent } from './chat-page/toolbar/chat-bar.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    ChatPageComponent,
    MessageComponent,
    ToolbarComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: 'chat',
            component: ChatPageComponent
          },
          {
            path: 'login',
            component: LoginPageComponent
          },
        ]
      }
    ]),
  ],
  exports: [RouterModule]
})
export class UserModule { }
