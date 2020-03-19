//app.js
import AV from './pages/libs/av-weapp-min.js';

App({
  onLaunch: function () {
    AV.init({
      appId: "mcoshkm3fro2kef3j4wtkxyid7k6o7zga85g4wjj0c4fc1tw",
      appKey: "fh1oohucqgtrv4572ldsswyn9y7udnuw59el6it3xqxjdlpp",
      serverURLs: "https://api.leancloud.cn"
    });
  },
  onError: function (msg) {
    console.log(msg);
  },
  globalData: {
    userName: ''
  }
})