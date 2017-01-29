import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


const CHATS: Chat[] = [
    { chatId: 1, peerName: 'Bob' },
    { chatId: 2, peerName: 'Alice' },
    { chatId: 3, peerName: 'John' },
];

const CHAT_HISTORY: ChatHistory = {
    chatId: 1,
    peerName: 'Bob',
    messages: [
        { from: 'Bob', text: 'Hi!' },
        { from: 'Mike', text: 'Hey!' },
        { from: 'Bob', text: 'How are you?' }
    ]
};

export interface Chat {
    chatId: number;
    peerName: string;
}

export interface Message {
    from: string;
    text: string;
}

export interface ChatHistory {
    chatId: number;
    peerName: string;
    messages: Message[];
}

const CHATS_URL = '/chats/';


@Injectable()
export class ChatService {
  constructor(private http: Http) {}
  
  getChats(): Observable<Chat[]> {
    return Observable.of(CHATS);
  }

  sendMessage(chatId: number, text: string): Observable<void> {
    return Observable.of(null);
  }

  private getChatHistory(chatId: number): Observable<ChatHistory> {
    console.log('requesting');
    return Observable.of(CHAT_HISTORY);
  }

  getChatHistorySubject: Subject<number> = new Subject();
  chatHistoryStream: Observable<ChatHistory> = this.getChatHistorySubject
    .switchMap(chatId => this.getChatHistory(chatId))
    .share();


  private makeRequest(path: string) {
    const params = new URLSearchParams();
    params.set('per_page', '100');

    const url = `https://api.github.com/${ path }`;
    return this.http.get(url, {search: params})
      .map((res) => res.json());
  }
}