import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ChatListComponent  } from './chatlist/chatlist.component';
import { ChatComponent } from './chat/chat.component';
import { HistoryComponent } from './chat/history/history.component';
import { TextareaComponent } from './chat/textarea/textarea.component';
import { ChatService } from './services/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatComponent,
    HistoryComponent,
    TextareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    ChatService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
