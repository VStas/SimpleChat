var fs = require('fs');

var koa = require('koa');
var koaStatic = require('koa-static');
var koaRouter = require('koa-router');
var bodyParser = require('koa-bodyparser');

var app = koa();
var router = koaRouter();

var store = require('./data.json');

app.use(bodyParser());

app.use(koaStatic('web/dist'));

app.use(function *(next) {
  if (this.request.query && this.request.query.username) {
    this.state.username = this.request.query.username;
    yield next;
  } else {
    this.status = 400;
    this.body = 'username is not specified';
  }
});

router.get('/chats/', function *() {
  this.body = getChatList(store, this.state.username);
});

router.post('/chats/:chatId/', function *() {
  if (this.params && this.params.chatId) {
    var chatId = parseInt(this.params.chatId, 10);
    saveMessage(store, chatId, this.state.username, this.request.body.text);
    fs.writeFileSync('./data.json', JSON.stringify(store));
    this.status = 200;
    this.body = {status: "OK"};
  } else {
    this.status = 400;
    this.body = 'chatId is not specified';    
  }  
});

router.get('/history/:chatId/', function *() {
  if (this.params && this.params.chatId) {
    var chatId = parseInt(this.params.chatId, 10);
    this.body = getChatHistory(store, chatId, this.state.username);
  } else {
    this.status = 400;
    this.body = 'chatId is not specified';    
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);

function getChatList(store, userName) {
  var chatList = [];
  for (var i = 0; i < store.chats.length; ++i) {
    var chat = store.chats[i];
    if (chat.peers[0] !== userName && chat.peers[1] !== userName) {
      continue;
    }
    var peerName;
    if (chat.peers[0] === userName) {
      peerName = chat.peers[1];
    } else {
      peerName = chat.peers[0];
    }
    chatList.push({ 
      peerName: peerName, 
      chatId: chat.chatId
    });
  }
  return chatList;
}

function getChatHistory(store, chatId, userName) {
  var history = {};
  for (var i = 0; i < store.chats.length; ++i) {
    var chat = store.chats[i];
    if (chat.chatId === chatId) {
      var peerName = chat.peers[0] === userName ? chat.peers[1] : chat.peers[0];
      history = {
        chatId: chat.chatId,
        messages: chat.messages,
        peerName: peerName
      };
      break;
    }
  }
  return history;
}

function saveMessage(store, chatId, userName, text) {
  for (var i = 0; i < store.chats.length; ++i) {
    var chat = store.chats[i];
    if (chat.chatId === chatId) {
      chat.messages.push({
        from: userName,
        text: text
      });
      break;
    }
  }
}
