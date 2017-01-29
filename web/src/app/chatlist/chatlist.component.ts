import { Component, OnInit } from '@angular/core';

import { ChatService, Chat } from '../services/chat.service';

@Component({
  selector: 'chat-list',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatListComponent implements OnInit {
  
  constructor(private chatService: ChatService) {}

  isLoading = true;
  chats: Chat[];

  ngOnInit(): void {
    this.isLoading = true;
    this.chatService
      .getChats()
      .subscribe(chats => {
        this.isLoading = false;
        this.chats = chats;
      });
  }
}
