//心跳检测
var heartCheck = {
  timeout: 3000, //每隔三秒发送心跳
  num: 3,  //3次心跳均未响应重连
  timeoutObj: null,
  start: function () {
    var _num = this.num;
    clearTimeout(this.timeoutObj);
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      console.log('发送心跳')
      ws.send("ping"); // 心跳包
      _num--;
      //计算答复的超时次数
      if (_num === 0) {
        ws.colse();
      }
    }, this.timeout)
  }
}


let ws = null
let lockReconnect = false;//避免重复连接
let reconnectTime = null; //重连

class Socket {
  constructor(url) {
    this.wsUrl = url
    this.createWebSocket()
  }
  init() {
    ws.onclose = ()=> {
      console.log('链接关闭');
      this.reconnect(this.wsUrl);
    };
    ws.onerror =  ()=> {
      console.log('发生异常了');
      this.reconnect(this.wsUrl);
    };
    ws.onopen = function () {
      //心跳检测重置
      heartCheck.start();
    };
    ws.onmessage = function ({ data }) {
      console.log('接收到消息',data);
      //拿到任何消息都说明当前连接是正常的
      heartCheck.start();
    }
  }
  createWebSocket() {
      ws = new WebSocket(this.wsUrl);
      this.init()
  }
  reconnect(url) {
    if (lockReconnect) {
      return;
    };
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    clearTimeout(reconnectTime);
    reconnectTime = setTimeout( ()=> {
      console.log('正常尝试重新连接')
      this.createWebSocket(url);
      lockReconnect = false;
    }, 4000);
  }
}

export default Socket
