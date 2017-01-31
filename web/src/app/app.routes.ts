import { Routes } from '@angular/router';

import { ChatListComponent  } from './chatlist/chatlist.component';
import { ChatComponent } from './chat/chat.component';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'chats/:chatId', component: ChatComponent },
];

