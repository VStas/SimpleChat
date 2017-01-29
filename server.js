var koa = require('koa');
var koaStatic = require('koa-static');
var koaRouter = require('koa-router');

var app = koa();
var router = koaRouter();

var store = require('./serverData.json');
console.log(store);

app.use(koaStatic('web/dist'));

router.get('/chats', function *() {
  var userName;
  if (this.request.query && this.request.query.username) {
    userName = this.request.query.username;
    this.body = getChatListForUser(store, userName);
  } else {
    this.status = 400;
    this.body = 'userName is not specified';
  }
});
// app.use(function *() {
//     this.body = 'Hello!';
// });

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000);

function getChatListForUser(store, userName) {
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
