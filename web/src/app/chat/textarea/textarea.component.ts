import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/pluck';

import { ChatService, ChatHistory } from '../../services/chat.service';



@Component({
  selector: 'text-area',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  
  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) {}

  chatId: number;
  userInput = '';

  onKeyUp(event: KeyboardEvent): void {
    if (!this.chatId) {
      return;
    }
    if (event.keyCode === 13) { // ENTER key
      this.chatService.sendMessage(this.chatId, this.userInput)
        .subscribe(() => {
          // console.log('here');
          this.chatService.getChatHistorySubject.next(this.chatId);
        });
      this.userInput = '';
    }
  }

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pluck('chatId')
      .subscribe((chatId: number) => {
        this.chatId = chatId;
      });
  }
}
