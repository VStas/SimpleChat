import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/takeUntil';

import 'rxjs/add/observable/interval';


import { ChatService, ChatHistory } from '../../services/chat.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// download chat history every 10 seconds
const DOWNLOAD_HISTORY_INTERVAL = 10000;

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  
  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) {}

  chatId: number;
  history: ChatHistory;

  private onDestroy: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.chatService.chatHistoryStream
      .takeUntil(this.onDestroy)
      .subscribe(history => {
        this.history = history;
      });

    this.activatedRoute
      .params
      .pluck('chatId')
      .takeUntil(this.onDestroy)
      .subscribe((chatId: number) => {
        this.chatId = chatId;
        this.chatService.getChatHistorySubject.next(chatId);
      });

    Observable.interval(DOWNLOAD_HISTORY_INTERVAL)
      .takeUntil(this.onDestroy)
      .subscribe(() => {
        if (this.chatId) {
          this.chatService.getChatHistorySubject.next(this.chatId);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
