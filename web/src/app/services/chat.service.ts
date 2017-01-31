import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';


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
const HISTORY_URL = '/history/';

@Injectable()
export class ChatService {
  constructor(private http: Http) {}
  
  getChats(): Observable<Chat[]> {
    return this.makeRequest(CHATS_URL, 'GET');
  }

  sendMessage(chatId: number, text: string): Observable<void> {
    return this.makeRequest(CHATS_URL + chatId, 'POST', { text });
  }

  private getChatHistory(chatId: number): Observable<ChatHistory> {
    return this.makeRequest(HISTORY_URL + chatId, 'GET');
  }

  getChatHistorySubject: Subject<number> = new Subject();
  chatHistoryStream: Observable<ChatHistory> = this.getChatHistorySubject
    .switchMap(chatId => this.getChatHistory(chatId))
    .share();

  private makeRequest(path: string, method: 'GET' | 'POST', body?: any) {
    const params = new URLSearchParams();
    params.set('username', 'Mike');

    const url = `http://${window.location.host}${ path }`;
    return this.http.request(url, { search: params, method, body })
      .map((res) => res.json());
  }
}
